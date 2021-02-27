const Router = require('express-promise-router');
// create a new express-promise-router
// this has the same API as the normal express router except
// it allows us to use async functions as route handlers
const router = new Router();
const db = require('../db');
const toCamelCase = require('../utils/to-camel-case');

// @route   POST api/reviews/recipes/:id
// @desc    Add a new review to a recipe
// @access  Private
router.post('/recipes/:id', async (req, res) => {
  try {
    const newReview = await db.query(
      'INSERT INTO reviews (recipe_id, author, rating, review, created_at) VALUES ($1, $2, $3, $4, $5) RETURNING *;',
      [
        req.params.id,
        req.body.author,
        req.body.rating,
        req.body.review,
        req.body.createdAt,
      ]
    );
    res.status(201).json({
      message: 'The new review was successfully recorded',
      review: toCamelCase(newReview.rows)[0],
    });
  } catch (err) {
    console.log(err.message);
  }
});

// export our router to be mounted by the parent application
module.exports = router;
