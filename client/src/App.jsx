import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HomePage from './components/layout/HomePage';
import SuperUserPage from './components/layout/SuperUserPage';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/superuser" component={SuperUserPage} />
      </Switch>
    </Router>
  );
};

export default App;
