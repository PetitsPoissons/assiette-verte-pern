import React, { useState, createContext } from 'react';

export const RecipesContext = createContext();

export const RecipesContextProvider = (props) => {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const addRecipe = (recipe) => {
    setRecipes([...recipes, recipe]);
  };

  return (
    <RecipesContext.Provider
      value={{
        recipes,
        setRecipes,
        addRecipe,
        selectedRecipe,
        setSelectedRecipe,
      }}
    >
      {props.children}
    </RecipesContext.Provider>
  );
};
