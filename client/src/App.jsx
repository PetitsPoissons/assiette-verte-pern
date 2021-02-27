import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { RecipesContextProvider } from './context/RecipesContext';
import { ReviewsContextProvider } from './context/ReviewsContext';
import HomePage from './components/layout/HomePage';
import MariellePage from './components/layout/MariellePage';
import UpdateRecipePage from './components/layout/UpdateRecipePage';
import RecipeDetailPage from './components/layout/RecipeDetailPage';

const App = () => {
  return (
    <RecipesContextProvider>
      <ReviewsContextProvider>
        <div className="container">
          <Router>
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route exact path="/marielle" component={MariellePage} />
              <Route
                exact
                path="/recipes/:id/update"
                component={UpdateRecipePage}
              />
              <Route exact path="/recipes/:id" component={RecipeDetailPage} />
            </Switch>
          </Router>
        </div>
      </ReviewsContextProvider>
    </RecipesContextProvider>
  );
};

export default App;
