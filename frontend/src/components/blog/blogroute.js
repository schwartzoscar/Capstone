import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import BlogCreation from './components/BlogCreation';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/create-blog" component={BlogCreation} />
        {/* Add more routes here*/}
      </Switch>
    </Router>
  );
}

export default App;
