import React from 'react';
import {
    Switch,
    Route
} from 'react-router-dom';

import AdvancedTable from './AdvancedTable';
import Stars from './Stars';
import Home from './Home';

export default function Routes() {
  return (
    <Switch>
      <Route path='/advanced-table'>
        <AdvancedTable/>
      </Route>
      <Route path='/stars'>
        <Stars/>
      </Route>
      <Route path='/'>
        <Home/>
      </Route>
    </Switch>
  );
}
