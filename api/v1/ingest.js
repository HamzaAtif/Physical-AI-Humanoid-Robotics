// api/v1/ingest.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { source_path, force_reindex = false } = req.body;

    // For Vercel deployment, we'll simulate the response or forward to a deployed backend
    // In a real scenario, you'd have the ingestion service implemented in Node.js

    // Simulated response - in reality, you'd call your backend service
    const result = {
      status: 'success',
      message: `Content from ${source_path} has been ${force_reindex ? 'reindexed' : 'ingested'}`,
      timestamp: new Date().toISOString()
    };

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      error: error.message || 'Internal server error during ingestion'
    });
  }
}