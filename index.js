const express = require('express');
const app = express();

// Logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

app.use(express.json());

// Your original routes
app.get('/api/recipe', async (req, res) => {
  try {
    const data = await getRecipe();
    res.status(200).json({ message: "Data Fetched", data: data });
  } catch (error) {
    res.status(500).json({ error: "Unable to fetch" });
  }
});

app.post('/api/recipes', async (req, res) => {
  try {
    const saveData = await createRecipe(req.body);
    res.status(201).json({ message: "Saved", data: saveData });
  } catch (error) {
    res.status(500).json({ error: "Unable to send data" });
  }
});

// ... Add more of your routes here ...

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
