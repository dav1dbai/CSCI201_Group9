import React from 'react';
import Sidebar from '../components/layout/sidebar';
import { RankedSong } from '../components/shared/RankedSong';
import { Song } from '../components/shared/Song';
import { searchTracks } from '../utils/spotify';
import { useEffect, useState } from 'react';
import { getAllReviews } from '../utils/reviews';

  const HomePage = () => {
    const demoData = {
      recentSongs: [
        {title: 'Last Christmas', artist: 'Wham!', rating: 4 },
        {title: 'Winter Wonderland', artist: 'Michael Bublé', rating: 5 },
        {title: 'Jingle Bell Rock', artist: 'Bobby Helms', rating: 3 },
        {title: 'Santa Baby', artist: 'Eartha Kith', rating: 4 }
      ],
    };

    const [rec, setRec] = useState([]);
    const [top, setTop] = useState([]);

    useEffect(() => {
        async function fetchData() {
            // recs
            const songs = await searchTracks('Christmas', 6);
            console.log("songs", songs);
            const songData = songs.tracks.items.map(item => ({
              id: item.id,
              title: item.name,
              artist: item.artists[0].name,
              image: item.album.images[0].url
            }));
            setRec(songData);

            // leaderboard
            const top = await getAllReviews();
            console.log("top", top);
            // DO THIS FOR LEADERBOARD
        }
        fetchData();
    }, []);

    return (
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
              {rec.map((song, i) => (
              <Song key={i} id={song.id} title={song.title} artist={song.artist} image={song.image}/>
              ))}
            </div>
          </section>
        </div>
    </div>
  );
}

export default HomePage; 