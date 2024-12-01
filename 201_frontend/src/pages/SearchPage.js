
import React, { useState } from 'react';
import Sidebar from '../components/layout/sidebar';
import { Search } from 'lucide-react';
import UserCard from '../components/search/UserCard';
import { Song } from '../components/shared/Song';


export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const users = [
    { id: 1, name: 'Alex' },
    { id: 2, name: 'Sanya' },
    { id: 3, name: 'Emmanuela' },
    { id: 4, name: 'Malia' },
    { id: 5, name: 'David' },
    { id: 6, name: 'Marco' },
  ];

  const songs = [
    { id: 1, title: 'Kiwi', artist: 'Harry Styles', color: 'bg-purple-500' },
    { id: 2, title: 'Daydreaming', artist: 'Harry Styles', color: 'bg-red-500' },
    { id: 3, title: 'Falling', artist: 'Harry Styles', color: 'bg-green-500' },
    { id: 4, title: 'She', artist: 'Harry Styles', color: 'bg-cyan-500' },
    { id: 5, title: 'Cinema', artist: 'Harry Styles', color: 'bg-amber-700' },
    { id: 6, title: 'Boyfriends', artist: 'Harry Styles', color: 'bg-purple-500' },
    { id: 7, title: 'Kiwi', artist: 'Harry Styles', color: 'bg-purple-500' },
    { id: 8, title: 'Daydreaming', artist: 'Harry Styles', color: 'bg-red-500' },
    { id: 9, title: 'Falling', artist: 'Harry Styles', color: 'bg-green-500' },
    { id: 10, title: 'She', artist: 'Harry Styles', color: 'bg-cyan-500' },
    { id: 11, title: 'Cinema', artist: 'Harry Styles', color: 'bg-amber-700' },
    { id: 12, title: 'Boyfriends', artist: 'Harry Styles', color: 'bg-purple-500' },
  ]

  return (
    <div className="flex min-h-screen bg-[#393939]">
      <Sidebar />
      <div className="flex-1 p-8">
        <div className="relative mb-8">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white rounded-2xl py-2 px-8 pl-12 text-black"
          />
          <Search className="absolute left-3 top-2.5 text-gray-900" size={20} />
        </div>

        <section className="mb-8 mx-2">
          <h2 className="text-xl text-white font-bold mb-3">People</h2>
          <div className="grid grid-cols- lg:grid-cols-6 gap-4">
          {users.map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
          </div>
        </section>

        <section className="mb-8 mx-2">
          <h2 className="text-xl text-white font-bold mb-3">Song Results</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {songs.map((song) => (
              <Song key={song.id} song={song} />
            ))}
          </div>
        </section>
      </div>
    </div>
    )
  }