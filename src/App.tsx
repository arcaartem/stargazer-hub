import React from 'react';
import PrintMe from './print';

export default function App() {
  return (
    <div>
      <h1>Hello, world!</h1>
      <h2>Bib</h2>
      <button onClick={PrintMe}>Click me!</button>
    </div>
  );
}
