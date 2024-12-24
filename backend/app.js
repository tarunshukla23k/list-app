const express = require('express');
const cors = require('cors');
const candidates = require('./data');

const app = express();
const PORT = 5001;

app.use(cors());

// API endpoint
app.get('/api/candidates', (req, res) => {
  res.json(candidates);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});