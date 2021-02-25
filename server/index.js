require('dotenv').config();
const express = require('express');
const cors = require('cors');
const recipesRouter = require('./routes/recipes');

const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use('/api/recipes', recipesRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
