import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { RecipesContext } from '../../context/RecipesContext';
import RecipeFinder from '../../apis/RecipeFinder';

const RecipeDetailPage = () => {
  const { id } = useParams();
  const { selectedRecipe, setSelectedRecipe } = useContext(RecipesContext);

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const { data } = await RecipeFinder.get(`/${id}`);
        setSelectedRecipe(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchRecipeDetails();
  }, []);

  return <div>{selectedRecipe && selectedRecipe.name}</div>;
};

export default RecipeDetailPage;
