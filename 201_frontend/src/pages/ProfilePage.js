import React from 'react';
import Sidebar from '../components/layout/sidebar';
import { RankedSongSm } from '../components/shared/RankedSongSm';
import { RecentActivity } from '../components/shared/RecentActivity';
import { useNavigate } from 'react-router-dom';
import { logout, getCurrentUser } from '../utils/auth';
import { getTracksByIds } from '../utils/spotify';
import { getReviewsByUser } from '../utils/reviews';
import { useEffect, useState } from 'react';

const ProfilePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: 'loading...',
    email: 'loading...',
    id: 'loading...'
  });
  
  const [reviews, setReviews] = useState([]);
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const currentUser = getCurrentUser();
        if (!currentUser) {
          navigate('/');
          return;
        }
        setUser(currentUser);
        const userReviews = await getReviewsByUser(currentUser.id);
        console.log('User reviews:', userReviews);
        setReviews(userReviews);
        if (userReviews && userReviews.length > 0) {
          const songIds = userReviews.map(review => review.song_id);
          const uniqueSongIds = [...new Set(songIds)]; 
          console.log('Fetching songs with IDs:', uniqueSongIds);
          
          const songsData = await getTracksByIds(uniqueSongIds);
          console.log('Songs data:', songsData);
          if (songsData && songsData.tracks) {
            setSongs(songsData.tracks);
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, [navigate]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };
  const recentActivity = reviews
    .map(review => {
      const song = songs.find(s => s && s.id === review.song_id);
      return {
        id: review.id,
        song: song ? song.name : 'Unknown Song',
        rating: review.stars,
        timestamp: new Date(review.created_at).toLocaleDateString(),
        description: review.description
      };
    })
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    const rankings = reviews
    .map(review => {
      const song = songs.find(s => s && s.id === review.song_id);
      return {
        id: review.id,
        title: song ? song.name : 'Unknown Song',
        artist: song?.artists?.[0]?.name || 'Unknown Artist',
        rating: review.stars,
        coverArt: song?.album?.images?.[0]?.url || '/images/Blank Album Cover.svg'
      };
    })
    .filter((item, index, self) => 
      index === self.findIndex((t) => t.title === item.title)
    ); 

  return (
    <div className="flex min-h-screen bg-[#393939]">
      <Sidebar />
      <div className="flex-1 p-8">

        <div className="flex justify-end">
          <button onClick={handleLogout} className="px-4 py-2 bg-green-500 text-white rounded-full transition-colors">
            Logout
          </button>
        </div>
        <div className="flex items-center gap-6 pl-8 mb-12">
          <div className="w-44 h-44 rounded-full bg-gray-600 overflow-hidden">
            <img src="/images/Blank User.svg" alt="Profile" className="w-full h-full object-cover" />
          </div>
          <div>
            <div className="text-sm text-white/60 mb-1">Me</div>
            <h1 className="text-4xl text-white font-bold mb-2">{user.username}</h1>
            <div className="text-white/60">{reviews.length} Rankings</div>
          </div>
        </div> 
        <div className="grid grid-cols-2 grid-flow-col gap-10 ml-6">
          <div className="bg-neutral-200/10 rounded-2xl p-6">
            <h2 className="text-3xl text-white font-bold mb-4">Recent Activity</h2>
            <div className="space-y-8">
              {recentActivity.map((activity) => (
                <RecentActivity key={activity.id} activity={activity} />
              ))}
            </div>
          </div>
          <div className="bg-neutral-200/10 rounded-2xl p-6 mr-6">
            <h2 className="text-3xl text-white font-bold mb-4">Rankings</h2>
            <div className="grid grid-cols-2 grid-cols-3 gap-4">
              {rankings.map((song) => (
                <RankedSongSm key={song.id} {...song} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage; 