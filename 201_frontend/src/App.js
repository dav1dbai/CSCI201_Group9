import logo from './logo.svg';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import ProfilePage from './pages/ProfilePage';
import './App.css';

/*function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;*/

const demoData = {
  recentSongs: [
    { id: 1, title: 'Last Christmas', artist: 'Wham!', rating: 4 },
    { id: 2, title: 'Winter Wonderland', artist: 'Michael Bublé', rating: 5 },
    { id: 3, title: 'Jingle Bell Rock', artist: 'Bobby Helms', rating: 3 },
    { id: 4, title: 'Santa Baby', artist: 'Eartha Kith', rating: 4 }
  ],
  categories: [
    { id: 1, title: 'Last Christmas', color: 'bg-purple-500' },
    { id: 2, title: 'Winter Wonderland', color: 'bg-red-500' },
    { id: 3, title: 'Jingle Bell Rock', color: 'bg-green-500' },
    { id: 4, title: 'White Christmas', color: 'bg-cyan-500' },
    { id: 5, title: 'Deck the Hall', color: 'bg-amber-700' }
  ]
};

const StarRating = ({ rating }) => (
  <div className="flex gap-0.5">
    {[1, 2, 3, 4, 5].map((star) => (
      <Star
        key={star}
        className={`w-4 h-4 ${star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'}`}
      />
    ))}
  </div>
);

const SongCard = ({ title, artist, rating }) => (
  <div className="bg-gray-800 p-4 rounded-lg">
    <div className="w-full h-48 bg-gray-700 rounded-lg mb-4">
      <img 
        src="/api/placeholder/200/200" 
        alt="Album art" 
        className="w-full h-full object-cover rounded-lg"
      />
    </div>
    <h3 className="text-white font-medium mb-1">{title}</h3>
    <p className="text-gray-400 text-sm mb-2">{artist}</p>
    <StarRating rating={rating} />
  </div>
);

const Sidebar = () => (
  <div className="w-64 bg-emerald-500 p-6 fixed h-full">
    <h1 className="text-white text-2xl font-bold mb-8">Rankify</h1>
    <nav className="space-y-4">
      <Link to="/" className="text-white block hover:bg-emerald-600 px-4 py-2 rounded-lg">
        Home
      </Link>
      <Link to="/rankings" className="text-white block hover:bg-emerald-600 px-4 py-2 rounded-lg">
        Rankings
      </Link>
      <Link to="/profile" className="text-white block hover:bg-emerald-600 px-4 py-2 rounded-lg">
        Profile
      </Link>
    </nav>
  </div>
);

const MainContent = () => (
  <div className="ml-64 flex-1 p-8">
    <section className="mb-12">
      <h2 className="text-white text-2xl font-bold mb-6">
        Top Rated Songs of the Week
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {demoData.recentSongs.map((song) => (
          <SongCard key={song.id} {...song} />
        ))}
      </div>
    </section>

    <section>
      <h2 className="text-white text-2xl font-bold mb-6">
        Recommended Songs
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {demoData.categories.map((category) => (
          <div
            key={category.id}
            className={`${category.color} rounded-lg p-4 aspect-square flex items-center justify-center text-center`}
          >
            <span className="text-white text-sm font-medium">
              {category.title}
            </span>
          </div>
        ))}
      </div>
    </section>
  </div>
);

const App = () => {
  return (
    <Router>
      <div className="flex min-h-screen bg-gray-900">
        <Sidebar />
        <Routes>
          <Route path="/" element={<MainContent />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/rankings" element={<MainContent />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App; 

