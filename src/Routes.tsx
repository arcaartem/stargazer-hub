import React from 'react';
import {
    Switch,
  Route,
} from 'react-router-dom';

import routes from './routeDefinitions';
import Stars from './pages/Stars';
import Home from './pages/Home';

function NoMatch() {
  return <h1>No match!</h1>;
}

export default function Routes() {
  return (
    <Switch>
      <Route path={ routes.stars.path } component={Stars} />
      <Route exact path={ routes.home.path } component={Home} />
      <Route path='*' component={NoMatch} />
    </Switch>
  );
}
