import React from 'react';
import { Routes, Route, } from 'react-router-dom';

import routeDefinitions from './routeDefinitions';
import Stars from './pages/Stars';
import Home from './pages/Home';

function NoMatch() {
  return <h1>No match!</h1>;
}

export default function RouteDefinitions() {
  return (
    <Routes>
      <Route path={ routeDefinitions.stars.path } element={<Stars/>} />
      <Route path={ routeDefinitions.home.path } element={<Home/>} />
      <Route path='*' element={<NoMatch/>} />
    </Routes>
  );
}
