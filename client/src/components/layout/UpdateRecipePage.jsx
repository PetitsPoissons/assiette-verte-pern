import React, { useState, useContext, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { RecipesContext } from '../../context/RecipesContext';
import RecipeFinder from '../../apis/RecipeFinder';

const UpdateRecipePage = (props) => {
  const { id } = useParams();
  let history = useHistory();
  const { recipes } = useContext(RecipesContext);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Category');
  const [prepTime, setPrepTime] = useState('');
  const [difficulty, setDifficulty] = useState('Difficulty');
  const [ingredients, setIngredients] = useState('');
  const [prepSteps, setPrepSteps] = useState('');

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const { data } = await RecipeFinder.get(`/${id}`);
        setName(data.recipe.name);
        setCategory(data.recipe.category);
        setPrepTime(data.recipe.prepTime);
        !data.recipe.difficulty
          ? setDifficulty('Difficulty')
          : setDifficulty(data.recipe.difficulty);
        setIngredients(data.recipe.ingredients);
        setPrepSteps(data.recipe.prepSteps);
      } catch (err) {
        console.log(err);
      }
    };
    fetchRecipe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await RecipeFinder.put(`/${id}`, {
      name,
      category,
      prepTime,
      difficulty: difficulty === 'Difficulty' ? null : parseInt(difficulty),
      ingredients,
      prepSteps,
    });
    history.push('/');
  };

  return (
    <div className="my-4">
      <form action="">
        <div className="form-row">
          <div className="col">
            <input
              type="text"
              className="form-control my-1"
              placeholder="Recipe Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="col">
            <select
              className="custom-select my-1 mr-sm-2"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option disabled>Category</option>
              <option value="breakfast">Breakfast</option>
              <option value="appetizer">Appetizer</option>
              <option value="main">Main Dish</option>
              <option value="side">Side Dish</option>
              <option value="snack">Snack</option>
              <option value="dessert">Dessert</option>
              <option value="drink">Drink</option>
            </select>
          </div>
          <div className="col">
            <input
              type="text"
              className="form-control my-1"
              placeholder="Prep Time"
              value={prepTime}
              onChange={(e) => setPrepTime(e.target.value)}
            />
          </div>
          <div className="col">
            <select
              className="custom-select my-1 mr-sm-2"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
            >
              <option disabled>Difficulty</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
        </div>
        {/* <div className="form-row">
          <div className="col">
            <select
              className="custom-select my-1 mr-sm-2"
              value={newIngredient.ingredient}
              onChange={addIngredient}
            >
              <option disabled>Ingredient</option>
              <option value="almond_milk">Almond Milk</option>
              <option value="almonds">Almonds</option>
              <option value="beet">Beet</option>
              <option value="carrot">Carrot</option>
              <option value="celeri">Celeri</option>
              <option value="dill">Dill</option>
              <option value="kale">Kale</option>
              <option value="lemon">Lemon</option>
              <option value="mustard">Mustard</option>
              <option value="olive_oil">Olive Oil</option>
            </select>
          </div>
          <div className="col">
            <input
              type="text"
              className="form-control my-1"
              placeholder="Quantity"
              value={newIngredient.quantity}
              onChange={(e) => setNewIngredient({ quantity: e.target.value })}
            />
          </div>
          <div className="col">
            <textarea
              className="form-control my-1"
              id="ingredientNote"
              rows="1"
              value={newIngredient.note}
              onChange={(e) => setNewIngredient({ note: e.target.value })}
            ></textarea>
          </div>
          <button className="btn btn-primary" onClick={addIngredient}>
            Add
          </button>
        </div> */}
        <div className="form-row">
          <div className="col">
            <label htmlFor="ingredients">List of Ingredients:</label>
            <textarea
              className="form-control my-1"
              id="ingredients"
              rows="5"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
            ></textarea>
          </div>
          <div className="col">
            <label htmlFor="prepSteps">Preparation Steps:</label>
            <textarea
              className="form-control my-1"
              id="prepSteps"
              rows="5"
              value={prepSteps}
              onChange={(e) => setPrepSteps(e.target.value)}
            ></textarea>
          </div>
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default UpdateRecipePage;
