import React from 'react';
import AddRecipe from '../recipes/AddRecipe';
import RecipeList4Marielle from '../recipes/RecipeList4Marielle';

const MariellePage = () => {
  return (
    <div>
      <h1 className="font-weight-light text-center my-3">
        Marielle's Dashboard
      </h1>
      <AddRecipe />
      <RecipeList4Marielle />
    </div>
  );
};

export default MariellePage;
