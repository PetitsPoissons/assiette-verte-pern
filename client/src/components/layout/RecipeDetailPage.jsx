import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { RecipesContext } from '../../context/RecipesContext';
import RecipeFinder from '../../apis/RecipeFinder';
import Reviews from '../reviews/Reviews';
import StarRating from '../reviews/StarRating';
import AddReview from '../reviews/AddReview';

const RecipeDetailPage = () => {
  const { id } = useParams();
  const { selectedRecipe, setSelectedRecipe } = useContext(RecipesContext);

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const { data } = await RecipeFinder.get(`/${id}`);
        console.log('data.recipe', data.recipe);
        setSelectedRecipe(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchRecipeDetails();
  }, []);

  return (
    <>
      {selectedRecipe && (
        <div className="mt-3">
          <h1 className="text-center display-5">
            {selectedRecipe.recipe.name}
          </h1>
          <div className="text-warning text-center">
            <StarRating rating={selectedRecipe.recipe.avgRating} />
            <span className="text-warning ml-1">
              {selectedRecipe.recipe.nbReviews
                ? ` - ${selectedRecipe.recipe.nbReviews} review(s)`
                : ' - No reviews'}
            </span>
          </div>
          <div className="mt-3">
            <Reviews reviews={selectedRecipe.reviews} />
          </div>
          <div className="mt-3">
            <AddReview />
          </div>
        </div>
      )}
    </>
  );
};

export default RecipeDetailPage;
