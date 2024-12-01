import React from 'react';
import Sidebar from '../components/layout/sidebar';
import { ChevronDown } from 'lucide-react'
import { RankedSongSm } from '../components/shared/RankedSongSm';
import { RecentActivity } from '../components/shared/RecentActivity';
import { useState } from 'react';
import { ArrowLeft, Plus, Check } from 'lucide-react'
import { Link, useParams } from 'react-router-dom';


export default function User() {
    const [isFriend, setIsFriend] = useState(false)
    const {user} = useParams()
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

  return (
    <div className="flex min-h-screen bg-[#393939]">
    <Sidebar />
    <div className="flex-1 p-8">
        <Link to="/search" className="inline-flex items-center text-gray-400 hover:text-white mb-4">
          <ArrowLeft className="mr-2" size={20} />
        </Link>
        {/* Profile section */}
        <div className="flex items-center gap-6 pl-8 mb-12">
          <div className="w-44 h-44 rounded-full bg-gray-600 overflow-hidden">
            <img src="/images/Blank User.svg" alt="Profile" className="w-full h-full object-cover" />
          </div>
          <div>
            <div className="text-sm text-white/60 mb-1">Profile</div>
            <h1 className="text-4xl text-white font-bold mb-2">{user}</h1>
            <div className="text-white/60">16 Rankings • 7 Friends</div>
            <button 
                onClick={() => setIsFriend(!isFriend)}
                className={`flex items-center my-3 px-3 py-1 text-white font-medium text-sm rounded-full ${
                isFriend 
                    ? 'bg-[#50C878]/90 hover:bg-[#50C878]/60' 
                    : 'outline outline-1 hover:bg-white/20 hover:outline-1'
            } transition`}
          >
            {isFriend ? (
              <>
                <Check className="w-4 h-4 mr-3" />
                Friends
              </>
            ) : (
              <>
                <Plus className="w-4 h-4 mr-3" />
                Add Friend
              </>
            )}
          </button>
          </div>
        </div>

        {/* Main content grid */}
        <div className="grid grid-cols-2 gap-10 ml-6">
          {/* Recent Activity */}
          <div className="bg-neutral-200/10 rounded-lg p-6">
            <h2 className="text-3xl text-white font-bold mb-4">Recent Activity</h2>
            <div className="space-y-8">
              {recentActivity.map((activity) => (
                <RecentActivity key={activity.id} activity={activity} />
              ))}
            </div>
          </div>

          {/* Rankings */}
          <div className="bg-neutral-200/10 rounded-lg p-6 mr-6">
            <h2 className="text-3xl text-white font-bold mb-4">Rankings</h2>
            <div className="grid grid-cols-2 grid-cols-3 gap-4">
              {rankings.map((song, index) => (
                <RankedSongSm key={index} {...song} />
              ))}
            </div>
            <button className="w-full mt-4 p-2 text-gray-400 hover:text-white transition-colors">
              <ChevronDown className="w-6 h-6 mx-auto" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};