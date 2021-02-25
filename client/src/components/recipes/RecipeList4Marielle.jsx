import React, { useEffect, useContext } from 'react';
import RecipeFinder from '../../apis/RecipeFinder';
import { RecipesContext } from '../../context/RecipesContext';

const RecipeList4Marielle = (props) => {
  const { recipes, setRecipes } = useContext(RecipesContext);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const { data } = await RecipeFinder.get('/');
        setRecipes(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchRecipes();
  }, []);
  return (
    <div className="list-group mt-5">
      <table className="table table-hover table-dark">
        <thead>
          <tr className="bg-secondary">
            <th scope="col">Recipe Name</th>
            <th scope="col">Category</th>
            <th scope="col">Prep Time</th>
            <th scope="col">Difficulty</th>
            <th scope="col">Ratings</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {recipes &&
            recipes.map((recipe) => {
              return (
                <tr key={recipe.id}>
                  <td>{recipe.name}</td>
                  <td>{recipe.category}</td>
                  <td>{recipe.preparation_time}</td>
                  <td>{recipe.difficulty}</td>
                  <td>TBD</td>
                  <td>
                    <button className="btn btn-warning">Edit</button>
                  </td>
                  <td>
                    <button className="btn btn-danger">Delete</button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default RecipeList4Marielle;
