import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ProductList from './components/ProductList';


function App() {
  return (
    <BrowserRouter>
      <ProductList />
    </BrowserRouter>
  );
}

export default App;
