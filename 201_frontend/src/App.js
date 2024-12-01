import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";

//pages
import ProfilePage from './pages/ProfilePage';
import HomePage from './pages/HomePage'
import Search from './pages/SearchPage'
import TestMessages from './pages/TestMessages'
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Terms from './pages/Terms';
import User from './pages/User';
import SongPage from './pages/SongPage';

const App = () => {
  return (
    <Router>
      <div className="flex min-h-screen bg-[#393939]">
        <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/signup" element={<RegisterPage />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/search" element={<Search />} />
            <Route path="/user/:user" element={<User />} /> 
            <Route path="/song/:song" element={<SongPage />} />
            <Route path="/messages" element={<TestMessages />} />
            <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

