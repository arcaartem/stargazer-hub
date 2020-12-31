import React from 'react';
import {
    Switch,
  Route,
} from 'react-router-dom';

import AdvancedTable from './pages/AdvancedTable';
import Stars from './pages/Stars';
import Home from './pages/Home';

function NoMatch() {
  return <h1>No match!</h1>;
}

export default function Routes() {
  return (
    <Switch>
      <Route path='/advanced-table' component={AdvancedTable} />
      <Route path='/stars' component={Stars} />
      <Route exact path='/' component={Home} />
      <Route path='*' component={NoMatch} />
    </Switch>
  );
}
