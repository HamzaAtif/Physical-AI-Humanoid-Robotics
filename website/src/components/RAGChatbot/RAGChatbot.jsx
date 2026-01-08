import React, { useState, useEffect, useRef } from 'react';
import './RAGChatbot.css';

// Define TypeScript-like interfaces using JSDoc
/**
 * @typedef {{ id: string, text: string, sender: 'user' | 'bot', timestamp: Date }} Message
 */

/**
 * @typedef {{ file: string, section: string, position: number }} SourceReference
 */

/**
 * @typedef {{ response: string, relevant_sources: SourceReference[], session_id: string }} QueryResponse
 */


const RAGChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const [selectedText, setSelectedText] = useState(null);
  const messagesEndRef = useRef(null);

  // Function to capture selected text
  useEffect(() => {
    const handleSelection = () => {
      const selectedText = window.getSelection()?.toString().trim();
      if (selectedText) {
        setSelectedText(selectedText);
      }
    };

    document.addEventListener('mouseup', handleSelection);
    return () => {
      document.removeEventListener('mouseup', handleSelection);
    };
  }, []);

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputText.trim() || isLoading) return;

    // Add user message
    const userMessage = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      // Prepare the query payload
      const queryPayload = {
        question: inputText,
        selected_text: selectedText,
        session_id: sessionId || undefined,
      };

      // Call the backend API - now using the Vercel API route
      const response = await fetch('/api/v1/query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(queryPayload),
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();

      // Update session ID if new session was created
      if (data.session_id && !sessionId) {
        setSessionId(data.session_id);
      }

      // Add bot response
      const botMessage = {
        id: `bot-${Date.now()}`,
        text: data.response,
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botMessage]);

      // Clear selected text after using it
      setSelectedText(null);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = {
        id: `error-${Date.now()}`,
        text: 'Sorry, I encountered an error. Please try again.',
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleExplainSelected = () => {
    if (selectedText) {
      setInputText(`Explain this: ${selectedText}`);
    }
  };

  return (
    <div className="rag-chatbot">
      {/* Chat window */}
      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <h3>Book Assistant</h3>
            <button
              className="close-button"
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
            >
              ×
            </button>
          </div>

          <div className="chat-messages">
            {messages.length === 0 ? (
              <div className="welcome-message">
                <p>Hello! I'm your book assistant. Ask me anything about the Physical AI and Robotics content.</p>
                {selectedText && (
                  <div className="selected-text-prompt">
                    <p>You selected: "{selectedText.substring(0, 50)}{selectedText.length > 50 ? '...' : ''}"</p>
                    <button onClick={handleExplainSelected} className="explain-button">
                      Explain this
                    </button>
                  </div>
                )}
              </div>
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  className={`message ${message.sender}-message`}
                >
                  <div className="message-content">
                    {message.text}
                  </div>
                  <div className="message-timestamp">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              ))
            )}
            {isLoading && (
              <div className="message bot-message">
                <div className="message-content">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {selectedText && (
            <div className="selected-text-bar">
              <span className="selected-text-preview">
                Selected: "{selectedText.substring(0, 60)}{selectedText.length > 60 ? '...' : ''}"
              </span>
              <button
                onClick={handleExplainSelected}
                className="explain-selected-button"
              >
                Explain this
              </button>
            </div>
          )}

          <form onSubmit={handleSubmit} className="chat-input-form">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask about the book content..."
              disabled={isLoading}
              className="chat-input"
            />
            <button
              type="submit"
              disabled={!inputText.trim() || isLoading}
              className="send-button"
            >
              Send
            </button>
          </form>
        </div>
      )}

      {/* Toggle button */}
      <button
        className={`chat-toggle-button ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? '×' : '💬'}
      </button>
    </div>
  );
};

export default RAGChatbot;