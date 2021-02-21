const users = require('./users');
const recipes = require('./recipes');

module.exports = (app) => {
  app.use('api/v1/users', users);
  app.use('api/v1/recipes', recipes);
  // etc..
};
