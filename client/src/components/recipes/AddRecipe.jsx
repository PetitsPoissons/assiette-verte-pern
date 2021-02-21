import React from 'react';

const AddRecipe = () => {
  return (
    <div className="mb-4">
      <form action="">
        <div className="form-row">
          <input
            type="text"
            className="form-control my-1"
            placeholder="Recipe Name"
          />
        </div>
        <div className="form-row">
          <div className="col">
            <select className="custom-select my-1 mr-sm-2">
              <option defaultValue>Category</option>
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
            />
          </div>
          <div className="col">
            <select className="custom-select my-1 mr-sm-2">
              <option defaultValue>Difficulty</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
        </div>
        <div className="form-row">
          <div className="col">
            <select className="custom-select my-1 mr-sm-2">
              <option defaultValue>Ingredient</option>
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
            />
          </div>
          <div className="col">
            <textarea
              className="form-control my-1"
              id="exampleFormControlTextarea1"
              rows="1"
            ></textarea>
          </div>
          <button className="btn btn-primary">Add</button>
        </div>
        <div className="form-row">
          <label htmlFor="prepSteps">Preparation Steps:</label>
          <textarea
            className="form-control my-1"
            id="prepSteps"
            rows="5"
          ></textarea>
        </div>
        <button className="btn btn-primary">Add Recipe</button>
      </form>
    </div>
  );
};

export default AddRecipe;
