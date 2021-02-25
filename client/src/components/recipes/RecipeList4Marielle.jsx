import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import RecipeFinder from '../../apis/RecipeFinder';
import { RecipesContext } from '../../context/RecipesContext';

const RecipeList4Marielle = (props) => {
  const { recipes, setRecipes } = useContext(RecipesContext);
  let history = useHistory();

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

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    try {
      await RecipeFinder.delete(`/${id}`);
      setRecipes(recipes.filter((recipe) => recipe.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdate = (e, id) => {
    e.stopPropagation();
    history.push(`/recipes/${id}/update`);
  };

  const handleRecipeSelect = (id) => {
    history.push(`/recipes/${id}`);
  };

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
                <tr
                  key={recipe.id}
                  onClick={() => handleRecipeSelect(recipe.id)}
                >
                  <td>{recipe.name}</td>
                  <td>{recipe.category}</td>
                  <td>{recipe.prepTime}</td>
                  <td>{recipe.difficulty}</td>
                  <td>TBD</td>
                  <td>
                    <button
                      className="btn btn-warning"
                      onClick={(e) => handleUpdate(e, recipe.id)}
                    >
                      Edit
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={(e) => handleDelete(e, recipe.id)}
                    >
                      Delete
                    </button>
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
