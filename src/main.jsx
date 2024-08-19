import React from 'react';
import ReactDOM from 'react-dom/client';
import CRUDList from './components/CRUDList';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CRUDList />  {/* Render the main component */}
  </React.StrictMode>
);
