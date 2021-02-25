import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { RecipesContextProvider } from './context/RecipesContext';
import HomePage from './components/layout/HomePage';
import MariellePage from './components/layout/MariellePage';
import UpdateRecipePage from './components/layout/UpdateRecipePage';

const App = () => {
  return (
    <RecipesContextProvider>
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
          </Switch>
        </Router>
      </div>
    </RecipesContextProvider>
  );
};

export default App;
