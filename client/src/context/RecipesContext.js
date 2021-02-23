import React, { useState, createContext } from 'react';

export const RecipesContext = createContext();

export const RecipesContextProvider = (props) => {
  const [recipes, setRecipes] = useState([]);
  return (
    <RecipesContext.Provider value={(recipes, setRecipes)}>
      {props.children}
    </RecipesContext.Provider>
  );
};
