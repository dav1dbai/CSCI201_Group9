import React from 'react';
import { Star } from 'lucide-react';
import Sidebar from '../components/layout/sidebar';


const ProfileStats = ({ label, value }) => (
  <div className="flex justify-between items-center text-sm py-2">
    <span className="text-gray-400">{label}</span>
    <span className="text-gray-300">{value}%</span>
  </div>
);

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
);

const ProfilePage = () => {
  const stats = [
    { label: 'Pop', value: 83.5 },
    { label: 'Rock', value: 76.2 },
    { label: 'Classical', value: 65.8 },
    { label: 'Jazz', value: 71.3 },
    { label: 'Electronic', value: 88.5 },
    { label: 'Hip Hop', value: 79.4 }
  ];

  const recentActivity = [
    { song: 'Last Christmas', rating: 4, timestamp: '2h ago' },
    { song: 'Winter Wonderland', rating: 5, timestamp: '4h ago' },
    { song: 'Jingle Bell Rock', rating: 3, timestamp: '1d ago' },
    { song: 'Santa Baby', rating: 4, timestamp: '2d ago' }
  ];

  return (
    <div className="flex min-h-screen bg-gray-900">
    <Sidebar />
      <div className=" flex-1 p-8">
        <div className="flex items-center mb-8">
          <div className="w-24 h-24 bg-gray-700 rounded-full overflow-hidden">
            <img
              src="/api/placeholder/96/96"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="ml-6">
            <h1 className="text-white text-2xl font-bold">Ilovemusic</h1>
            <p className="text-gray-400">@username</p>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-white text-xl font-bold mb-4">Rankings</h2>
            <div className="space-y-1">
              {stats.map((stat) => (
                <ProfileStats
                  key={stat.label}
                  label={stat.label}
                  value={stat.value}
                />
              ))}
            </div>
          </div>
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-white text-xl font-bold mb-4">Recent Activity</h2>
            <div className="divide-y divide-gray-700">
              {recentActivity.map((activity, index) => (
                <RecentActivity
                  key={index}
                  song={activity.song}
                  rating={activity.rating}
                  timestamp={activity.timestamp}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage; 