import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { RecipesContextProvider } from './context/RecipesContext';
import HomePage from './components/layout/HomePage';
import MariellePage from './components/layout/MariellePage';

const App = () => {
  return (
    <RecipesContextProvider>
      <div className="container">
        <Router>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/marielle" component={MariellePage} />
          </Switch>
        </Router>
      </div>
    </RecipesContextProvider>
  );
};

export default App;
