import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Pane } from 'evergreen-ui';

import Navigation from './Navigation';
import Routes from './Routes';

function App() {
  return (
    <React.StrictMode>
      <Router>
        <Pane>
          <Navigation/>
          <Routes/>
        </Pane>
      </Router>
    </React.StrictMode>
  );
}

export default App;
