// api/v1/query.js - Vercel serverless function for RAG chatbot
import { QdrantClient } from '@qdrant/js-client-rest';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { question, selected_text, session_id } = req.body;

    // Validate required fields
    if (!question) {
      return res.status(400).json({ error: 'Question is required' });
    }

    // Get environment variables
    const openrouterApiKey = process.env.OPENROUTER_API_KEY;
    const qdrantUrl = process.env.QDRANT_URL;
    const qdrantApiKey = process.env.QDRANT_API_KEY;
    const qdrantCollectionName = process.env.QDRANT_COLLECTION_NAME || 'book_content';
    const openrouterChatModel = process.env.OPENROUTER_CHAT_MODEL || 'xiaomi/mimo-v2-flash:free';

    if (!openrouterApiKey) {
      return res.status(500).json({ error: 'OpenRouter API key not configured' });
    }

    // Initialize Qdrant client if URL is provided
    let qdrantClient = null;
    if (qdrantUrl && qdrantApiKey) {
      qdrantClient = new QdrantClient({
        url: qdrantUrl,
        apiKey: qdrantApiKey
      });
    }

    // Perform vector search if Qdrant is configured
    let relevantChunks = [];

    if (qdrantClient) {
      try {
        // In a serverless environment, generating embeddings on-the-fly is challenging
        // The proper approach would be to use a pre-computed vector database
        // Let's attempt to use an embedding service to convert the query to a vector

        // First, try to get embeddings using OpenAI's API (since OpenRouter may not support embeddings natively)
        // We'll need to check if we can access an embedding API
        let queryEmbedding = null;

        // Try using OpenAI's embedding API directly with the OpenRouter key (some keys work with both)
        try {
          const embeddingResponse = await fetch('https://api.openai.com/v1/embeddings', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${openrouterApiKey}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              model: 'text-embedding-ada-002',
              input: question
            })
          });

          if (embeddingResponse.ok) {
            const embeddingData = await embeddingResponse.json();
            queryEmbedding = embeddingData.data[0].embedding;
          }
        } catch (openaiError) {
          console.log('OpenAI embedding API failed, trying OpenRouter embedding endpoint...');
        }

        // If OpenAI API didn't work, try OpenRouter's embedding endpoint
        if (!queryEmbedding) {
          try {
            const embeddingResponse = await fetch('https://openrouter.ai/api/v1/embeddings', {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${openrouterApiKey}`,
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                model: 'text-embedding-ada-002',
                input: question
              })
            });

            if (embeddingResponse.ok) {
              const embeddingData = await embeddingResponse.json();
              queryEmbedding = embeddingData.data[0].embedding;
            }
          } catch (openrouterEmbedError) {
            console.log('OpenRouter embedding API also failed');
          }
        }

        if (queryEmbedding) {
          // Now perform the vector search using the computed embedding
          const searchResult = await qdrantClient.search(qdrantCollectionName, {
            vector: queryEmbedding,
            limit: 5,
            with_payload: true
          });

          relevantChunks = searchResult.map(result => ({
            chunk_id: result.id,
            content: result.payload?.content_preview || result.payload?.content || '',
            source_file: result.payload?.source_file || result.payload?.file || '',
            position: result.payload?.position || 0,
            section_title: result.payload?.section_title || result.payload?.section || '',
            similarity_score: result.score
          }));
        } else {
          console.warn('Could not generate embeddings, proceeding without vector search');
        }
      } catch (searchError) {
        console.warn('Vector search failed, proceeding without context:', searchError.message);
      }
    }

    // Format context from relevant chunks
    let context = 'No relevant content found in the book. Answer based on general knowledge of Physical AI and Robotics.';
    if (relevantChunks.length > 0) {
      const contextParts = ['Relevant information from the book:'];
      relevantChunks.forEach((chunk, i) => {
        contextParts.push(
          `${i + 1}. From '${chunk.section_title || 'Unknown Section'}' ` +
          `in ${chunk.source_file || 'Unknown File'}:\n` +
          `   ${chunk.content.substring(0, 300)}...`
        );
      });
      context = contextParts.join('\n\n');
    }

    // Create the prompt with context
    let prompt;
    if (selected_text) {
      prompt = `
        You are a helpful assistant for a Physical AI and Robotics course book.
        The user has selected the following text: "${selected_text}"
        The user wants an explanation of this text.

        Here is relevant context from the book:
        ${context}

        Please provide a clear explanation of the selected text, using the context from the book when relevant.
        Include any code examples, module references, or quiz-style explanations if appropriate.
      `;
    } else {
      prompt = `
        You are a helpful assistant for a Physical AI and Robotics course book.
        The user has asked: "${question}"

        Here is relevant context from the book:
        ${context}

        Please provide a helpful answer based on the book content.
        Include any code examples, module references, or quiz-style explanations if appropriate.
        If the question cannot be answered based on the book content, please say so clearly.
      `;
    }

    // Call OpenRouter API
    const openrouterResponse = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openrouterApiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: openrouterChatModel,
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7
      })
    });

    if (!openrouterResponse.ok) {
      const errorData = await openrouterResponse.json();
      throw new Error(`OpenRouter API error: ${errorData.error?.message || 'Unknown error'}`);
    }

    const openrouterData = await openrouterResponse.json();
    const responseText = openrouterData.choices[0]?.message?.content;

    // Extract source references from relevant chunks
    const sourceReferences = relevantChunks.map(chunk => ({
      file: chunk.source_file || 'Unknown File',
      section: chunk.section_title || 'Unknown Section',
      position: chunk.position || 0
    }));

    // Generate a session ID if not provided
    const returnSessionId = session_id || `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Return the response
    res.status(200).json({
      response: responseText,
      relevant_sources: sourceReferences,
      session_id: returnSessionId
    });
  } catch (error) {
    console.error('Query API error:', error);
    res.status(500).json({
      error: 'Internal server error',
      details: error.message
    });
  }
}

export const config = {
  api: {
    externalResolver: true,
    maxDuration: 30, // Allow longer execution for complex queries
  },
};