const Router = require('express-promise-router');
// create a new express-promise-router
// this has the same API as the normal express router except
// it allows us to use async functions as route handlers
const router = new Router();
const db = require('../db');
const toCamelCase = require('../utils/to-camel-case');

// @route   GET api/recipes
// @desc    Get all recipes with their average rating and nb of reviews
// @access  Private
router.get('/', async (req, res) => {
  try {
    const recipes = await db.query(
      'SELECT * FROM recipes LEFT JOIN (SELECT recipe_id, COUNT(review) AS nb_reviews, TRUNC(AVG(rating), 1) AS avg_rating FROM reviews GROUP BY recipe_id) reviews ON reviews.recipe_id = recipes.id;'
    );
    res.status(200).json({
      message: 'The recipes were successfully retrieved',
      recipes: toCamelCase(recipes.rows),
    });
  } catch (err) {
    console.log(err.message);
  }
});

// @route   GET api/recipes/:id
// @desc    Get a recipe
// @access  Private
router.get('/:id', async (req, res) => {
  try {
    const selectedRecipe = await db.query(
      'SELECT * FROM recipes LEFT JOIN (SELECT recipe_id, COUNT(review) AS nb_reviews, TRUNC(AVG(rating), 1) AS avg_rating FROM reviews GROUP BY recipe_id) reviews ON reviews.recipe_id = recipes.id WHERE id = $1',
      [req.params.id]
    );
    const reviews = await db.query(
      'SELECT * FROM reviews WHERE recipe_id = $1',
      [req.params.id]
    );
    res.status(200).json({
      message:
        'The selected recipe and its reviews were successfully retrieved',
      recipe: toCamelCase(selectedRecipe.rows)[0],
      reviews: toCamelCase(reviews.rows),
    });
  } catch (err) {
    console.log(err.message);
  }
});

// @route   POST api/recipes
// @desc    Add a new recipe
// @access  Private
router.post('/', async (req, res) => {
  try {
    const newRecipe = await db.query(
      'INSERT INTO recipes (name, category, prep_time, difficulty, prep_steps, ingredients, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;',
      [
        req.body.name,
        req.body.category,
        req.body.prepTime,
        req.body.difficulty,
        req.body.prepSteps,
        req.body.ingredients,
        req.body.createdAt,
      ]
    );
    res.status(201).json({
      message: 'The new recipe was successfully recorded',
      recipe: toCamelCase(newRecipe.rows)[0],
    });
  } catch (err) {
    console.log(err.message);
  }
});

// @route   PUT api/recipes/:id
// @desc    Update a recipe
// @access  Private
router.put('/:id', async (req, res) => {
  try {
    const updatedRecipe = await db.query(
      'UPDATE recipes SET name = $1, category = $2, prep_time = $3, difficulty = $4, prep_steps = $5, ingredients = $6 WHERE id = $7 RETURNING *',
      [
        req.body.name,
        req.body.category,
        req.body.prepTime,
        req.body.difficulty,
        req.body.prepSteps,
        req.body.ingredients,
        req.params.id,
      ]
    );
    res.status(200).json({
      message: 'The selected recipe was successfully updated',
      recipe: toCamelCase(updatedRecipe.rows)[0],
    });
  } catch (err) {
    console.log(err.message);
  }
});

// @route   DELETE api/recipes/:id
// @desc    Delete a recipe
// @access  Private
router.delete('/:id', async (req, res) => {
  try {
    await db.query('DELETE FROM recipes WHERE id = $1', [req.params.id]);
    res.status(204).json({
      message: 'The selected recipe was successfully deleted',
    });
  } catch (err) {
    console.log(err.message);
  }
});

// export our router to be mounted by the parent application
module.exports = router;
