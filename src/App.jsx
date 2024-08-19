import React from 'react';
import CRUDList from './components/CRUDList';
import './App.css';

function App() {
  return (
    <div className="container">
      <header>
        <h1>My CRUD Application</h1>
      </header>
      <CRUDList />
      <footer>
        <p>© 2024 My Company</p>
      </footer>
    </div>
  );
}

export default App;