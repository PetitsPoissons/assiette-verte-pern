const Router = require('express-promise-router');
// create a new express-promise-router
// this has the same API as the normal express router except
// it allows us to use async functions as route handlers
const router = new Router();
const db = require('../db');
const toCamelCase = require('../utils/to-camel-case');

// @route   GET api/recipes
// @desc    Get all recipes
// @access  Private
router.get('/', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM recipes');
    res.send(toCamelCase(rows));
  } catch (err) {
    console.log(err.message);
  }
});

// @route   GET api/recipes/:id
// @desc    Get a recipe
// @access  Private
router.get('/:id', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM recipes WHERE id = $1', [
      req.params.id,
    ]);
    res.send(toCamelCase(rows)[0]);
  } catch (err) {
    console.log(err.message);
  }
});

// @route   POST api/recipes
// @desc    Add a new recipe
// @access  Private
router.post('/', async (req, res) => {
  try {
    const {
      rows,
    } = await db.query(
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
    res.send(toCamelCase(rows)[0]);
  } catch (err) {
    console.log(err.message);
  }
});

// @route   PUT api/recipes/:id
// @desc    Update a recipe
// @access  Private
router.put('/:id', async (req, res) => {
  console.log('req.body', req.body);
  try {
    const {
      rows,
    } = await db.query(
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
    res.send(toCamelCase(rows)[0]);
  } catch (err) {
    console.log(err.message);
  }
});

// @route   DELETE api/recipes/:id
// @desc    Delete a recipe
// @access  Private
router.delete('/:id', async (req, res) => {
  try {
    const { rows } = await db.query('DELETE FROM recipes WHERE id = $1', [
      req.params.id,
    ]);
    res.send('The recipe was successfully deleted');
  } catch (err) {
    console.log(err.message);
  }
});

// export our router to be mounted by the parent application
module.exports = router;
