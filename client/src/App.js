import React from 'react';
import { Router } from '@reach/router';
import Home from './pages/Home/Home';
import './App.scss';
import Header from './components/Header/Header';
import Issues from './pages/ListIssues/Issues';

function App() {
  return (
    <div className="App">
      <Header />
      <Router>
        <Home path="/" />
        <Issues path="/issues" />
      </Router>
    </div>
  );
}

export default App;
