const Router = require('express-promise-router');

const db = require('../db');

// create a new express-promise-router
// this has the same API as the normal express router except
// it allows us to use async functions as route handlers
const router = new Router();

// get a recipe
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const { rows } = await db.query('SELECT * FROM recipes WHERE id = $1', [id]);
  res.send(rows[0]);
});

// export our router to be mounted by the parent application
module.exports = router;
