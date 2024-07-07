import React from 'react';
import logo from './logo.svg';
import './App.css';
import AuthPage from './pages/AuthPage';
import Header from './components/Header';

function App() {
  return (
    <div className="app">
      <Header />
      <AuthPage />
    </div>
  );
}

export default App;
