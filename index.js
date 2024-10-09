const express = require('express');
const app = express();

// Logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Root route
app.get('/', (req, res) => {
  res.send('Hello from the root route!');
});

// Test route
app.get('/test', (req, res) => {
  res.send('Hello from the test route!');
});

// Catch-all route
app.use('*', (req, res) => {
  res.status(404).send(`Not Found: ${req.originalUrl}`);
});

// For local testing
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

module.exports = app;
