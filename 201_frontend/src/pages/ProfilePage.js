import React from 'react';
import Sidebar from '../components/layout/sidebar';
import { ChevronDown } from 'lucide-react'
import { RankedSongSm } from '../components/shared/RankedSongSm';
import { RecentActivity } from '../components/shared/RecentActivity';
import { useNavigate } from 'react-router-dom';

/*
const RecentActivity = ({ song, rating, timestamp }) => (
  <div className="flex items-start space-x-4 py-3">
    <div className="w-12 h-12 bg-gray-700 rounded-lg overflow-hidden flex-shrink-0">
      <img 
        src="/api/placeholder/48/48" 
        alt={song} 
        className="w-full h-full object-cover"
      />
    </div>
    <div className="flex-1">
      <div className="flex items-center justify-between">
        <p className="text-white text-sm">Rated "{song}"</p>
        <span className="text-gray-400 text-xs">{timestamp}</span>
      </div>
      <div className="flex gap-0.5 mt-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-600'
            }`}
          />
        ))}
      </div>
    </div>
  </div>
);*/

const ProfilePage = () => {
  const navigate = useNavigate()
  /*
  const stats = [
    { label: 'Pop', value: 83.5 },
    { label: 'Rock', value: 76.2 },
    { label: 'Classical', value: 65.8 },
    { label: 'Jazz', value: 71.3 },
    { label: 'Electronic', value: 88.5 },
    { label: 'Hip Hop', value: 79.4 }
  ];*/

  const rankings = [
    { id: 1, title: 'Last Christmas', artist: 'Wham!', rating: 4 },
    { id: 2, title: 'Winter Wonderland', artist: 'Michael Bublé', rating: 5 },
    { id: 3, title: 'Jingle Bell Rock', artist: 'Bobby Helms', rating: 3 },
    { id: 4, title: 'Santa Baby', artist: 'Eartha Kith', rating: 4 },
    { id: 5, title: 'White Christmas', artist: 'Artist' },
    { id: 6, title: 'Deck the Hall', artist: 'Artist' }
  ]

  const recentActivity = [
    { id: 1, song: 'Last Christmas', rating: 4, timestamp: '2h ago' },
    { id: 2, song: 'Winter Wonderland', rating: 5, timestamp: '4h ago' },
    { id: 3, song: 'Jingle Bell Rock', rating: 3, timestamp: '1d ago' },
    { id: 4, song: 'Santa Baby', rating: 4, timestamp: '2d ago' }
  ];

  const handleLogout = () => {
    // Here you would typically clear any authentication tokens or user data
    // For this example, we'll just redirect to the login page
    navigate('/')
  }

  return (
    <div className="flex min-h-screen bg-[#393939]">
    <Sidebar />
    <div className="flex-1 p-8">
        {/* Header with logout button */}
        <div className="flex justify-end">
          <button onClick={handleLogout} className="px-4 py-2 bg-green-500 text-white rounded-full transition-colors">
            Logout
          </button>
        </div>

        {/* Profile section */}
        <div className="flex items-center gap-6 pl-8 mb-12">
          <div className="w-44 h-44 rounded-full bg-gray-600 overflow-hidden">
            <img src="/images/Blank User.svg" alt="Profile" className="w-full h-full object-cover" />
          </div>
          <div>
            <div className="text-sm text-white/60 mb-1">Me</div>
            <h1 className="text-4xl text-white font-bold mb-2">Ilovemusic</h1>
            <div className="text-white/60">16 Rankings • 7 Friends</div>
          </div>
        </div>

        {/* Main content grid */}
        <div className="grid grid-cols-2 grid-flow-col gap-10 ml-6">
          {/* Recent Activity */}
          <div className="bg-neutral-200/10 rounded-2xl p-6">
            <h2 className="text-3xl text-white font-bold mb-4">Recent Activity</h2>
            <div className="space-y-8">
              {recentActivity.map((activity) => (
                <RecentActivity key={activity.id} activity={activity} />
              ))}
            </div>
          </div>

          {/* Rankings */}
          <div className="bg-neutral-200/10 rounded-2xl p-6 mr-6">
            <h2 className="text-3xl text-white font-bold mb-4">Rankings</h2>
            <div className="grid grid-cols-2 grid-cols-3 gap-4">
              {rankings.map((song, index) => (
                <RankedSongSm key={index} {...song} />
              ))}
            </div>
            <button className="w-full mt-4 p-2 text-white/60 hover:text-white transition-colors">
              <ChevronDown className="w-6 h-6 mx-auto" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage; 