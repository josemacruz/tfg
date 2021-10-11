import React from 'react';
import { Router } from '@reach/router';
import { Dashboard } from './pages/Dashboard';
import List from './pages/Issues/List/index';
import Header from './components/Header/index';
import './App.scss';

function App() {
  return (
    <div className="App">
      <Header />
      <Router>
        <Dashboard path="/" />
        <List path="/issues" />
      </Router>
    </div>
  );
}

export default App;
