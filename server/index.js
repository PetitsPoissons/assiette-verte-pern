require('dotenv').config();
const express = require('express');
const cors = require('cors');
const recipesRouter = require('./routes/recipes');
const reviewsRouter = require('./routes/reviews');

const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use('/api/recipes', recipesRouter);
app.use('/api/reviews', reviewsRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
