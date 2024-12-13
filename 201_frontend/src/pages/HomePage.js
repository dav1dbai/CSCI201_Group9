import React from 'react';
import Sidebar from '../components/layout/sidebar';
import { RankedSong } from '../components/shared/RankedSong';
import { Song } from '../components/shared/Song';
import { searchTracks, getTracksByIds } from '../utils/spotify';
import { useEffect, useState } from 'react';
import { getAllReviews } from '../utils/reviews';

const HomePage = () => {
    const [rec, setRec] = useState([]);
    const [topSongs, setTopSongs] = useState([]);

    useEffect(() => {
        async function fetchData() {
            // recs
            const songs = await searchTracks('Christmas', 6);
            const songData = songs.tracks.items.map(item => ({
                id: item.id,
                title: item.name,
                artist: item.artists[0].name,
                image: item.album.images[0].url
            }));
            setRec(songData);

            // leaderboard
            const reviews = await getAllReviews();
            
            // Get unique song IDs from reviews
            const uniqueSongIds = [...new Set(reviews.map(review => review.song_id))];
            
            // Fetch song details from Spotify
            const tracksData = await getTracksByIds(uniqueSongIds);
            
            // Combine Spotify data with review data
            const topSongsData = tracksData.tracks.map(track => {
                const relatedReviews = reviews.filter(review => review.song_id === track.id);
                const averageRating = relatedReviews.reduce((acc, curr) => acc + curr.stars, 0) / relatedReviews.length;
                
                return {
                    id: track.id,
                    title: track.name,
                    artist: track.artists[0].name,
                    image: track.album.images[0].url,
                    rating: Math.round(averageRating)
                };
            });

            // Sort by rating (highest first)
            topSongsData.sort((a, b) => b.rating - a.rating);
            topSongsData.splice(4);
            console.log("sliced", topSongsData);
            setTopSongs(topSongsData);
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
                        {topSongs.map((song, index) => (
                            <RankedSong 
                                key={song.id}
                                id={song.id}
                                title={song.title}
                                artist={song.artist}
                                rating={song.rating}
                                image={song.image}
                            />
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