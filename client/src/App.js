import React from 'react';
import { Router } from '@reach/router';
import Home from './pages/Home/Home';
import Rules from './pages/Rules/Rules';
import './App.scss';
import Header from './components/Header/Header';
import Widgets from './pages/Widgets/Widgets';

function App() {
  return (
    <div className="App">
      <Header />
      <Router>
        <Home path="/" />
        <Rules path="/rules" />
        <Widgets path="/widgets" />
      </Router>
    </div>
  );
}

export default App;
