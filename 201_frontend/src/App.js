import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";

//pages
import ProfilePage from './pages/ProfilePage';
import HomePage from './pages/HomePage'
import Search from './pages/Search'
import TestMessages from './pages/TestMessages'
import LoginPage from './pages/LoginPage';

const App = () => {
  return (
    <Router>
      <div className="flex min-h-screen bg-gray-900">
        <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/search" element={<Search />} />
            <Route path="/messages" element={<TestMessages />} />
            <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

