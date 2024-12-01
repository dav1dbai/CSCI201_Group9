import React from 'react';
import Sidebar from '../components/layout/sidebar';
import { RankedSong } from '../components/shared/RankedSong';
import { Song } from '../components/shared/Song';

const demoData = {
    recentSongs: [
      {title: 'Last Christmas', artist: 'Wham!', rating: 4 },
      {title: 'Winter Wonderland', artist: 'Michael Bublé', rating: 5 },
      {title: 'Jingle Bell Rock', artist: 'Bobby Helms', rating: 3 },
      {title: 'Santa Baby', artist: 'Eartha Kith', rating: 4 }
    ],
    recs: [
      { id: 1, title: 'Last Christmas', artist: 'Wham!' },
      { id: 2, title: 'Winter Wonderland', artist: 'Michael Bublé' },
      { id: 3, title: 'Jingle Bell Rock', artist: 'Bobby Helms' },
      { id: 4, title: 'White Christmas', artist: 'Artist' },
      { id: 5, title: 'Deck the Hall', artist: 'Artist' },
      { id: 6, title: 'Santa Baby', artist: 'Eartha Kith' }
    ]
  };
  
  /*
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
  );*/
  
  
  const HomePage = () => (
    <div className="flex min-h-screen bg-[#393939]">
        <Sidebar />
        <div className="flex-1 p-8">
          <section className="mb-12">
            <h2 className="text-white text-2xl font-bold mb-6 mx-4">
              Top Rated Songs of the Week
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mx-4">
              {demoData.recentSongs.map((song, index) => (
                <RankedSong key={index} {...song} />
              ))}
            </div>
          </section>
          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-white mx-4">Recommended Songs</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mx-4">
              {demoData.recs.map((song, i) => (
              <Song key={song.id} title={song.title} artist={song.artist} image={"/images/Blank Album Cover.svg"}/>
              ))}
            </div>
          </section>
        </div>
    </div>
  );

  export default HomePage; 