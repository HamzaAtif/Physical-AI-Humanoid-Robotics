// api/health.js - Health check for the API proxy
export default function handler(req, res) {
  res.status(200).json({
    status: 'healthy',
    message: 'API proxy is running',
    timestamp: new Date().toISOString()
  });
}