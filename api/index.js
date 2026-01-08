// api/index.js - Generic API proxy
export default async function handler(req, res) {
  // Get the full path from the original URL
  const originalUrl = req.url || req.originalUrl || '';

  // Extract the path after /api
  const pathMatch = originalUrl.match(/\/api\/(.*)/);
  let backendPath = '/';
  if (pathMatch && pathMatch[1]) {
    backendPath = '/' + pathMatch[1];
  } else {
    // If no specific path, default to root
    backendPath = '/';
  }

  // Construct the backend URL
  const backendUrl = `${process.env.BACKEND_URL || 'http://localhost:8000'}${backendPath}`;

  try {
    // Forward the request to the backend
    const response = await fetch(backendUrl, {
      method: req.method,
      headers: {
        'Content-Type': 'application/json',
        ...req.headers,
        // Remove host header to prevent issues
        host: undefined,
        'x-forwarded-host': req.headers.host,
        'x-original-url': originalUrl
      },
      body: req.body ? JSON.stringify(req.body) : undefined,
    });

    // Get the response data
    let data;
    try {
      data = await response.json();
    } catch (parseError) {
      // If response is not JSON, return as text
      const text = await response.text();
      return res.status(response.status).send(text);
    }

    // Send back the response with the same status code
    res.status(response.status).json(data);
  } catch (error) {
    console.error('API Proxy Error:', error);
    res.status(500).json({
      error: 'Backend service unavailable',
      details: error.message
    });
  }
}

export const config = {
  api: {
    externalResolver: true,
  },
};