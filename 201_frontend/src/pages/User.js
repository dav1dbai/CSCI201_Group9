import React from 'react';
import Sidebar from '../components/layout/sidebar';
import { ChevronDown } from 'lucide-react'
import { RankedSongSm } from '../components/shared/RankedSongSm';
import { RecentActivity } from '../components/shared/RecentActivity';
import { useState } from 'react';
import { ArrowLeft, Plus, Check } from 'lucide-react'
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom';
import { getTracksByIds } from '../utils/spotify';
import { getReviewsByUser } from '../utils/reviews';
import { useEffect } from 'react';
import { getCurrentUser, addFriend, removeFriend, checkFriendStatus } from '../utils/auth';


export default function User() {
    const navigate = useNavigate();
    const [isFriend, setIsFriend] = useState(false)
    const [reviews, setReviews] = useState([]);
    const [songs, setSongs] = useState([]);
    const [friends, setFriends] = useState(0);
    const {user} = useParams()
    const location = useLocation();
    const { id } = location.state || {};
    const currentUser = getCurrentUser();

    async function fetchFriendsData() {  
      let fetchedFriends = [];
      fetch(`http://localhost:8080/FPP_9/chat/getFriends?user_id=${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data.friends);
          fetchedFriends = data.friends;
        })
        .catch((error) => {
          console.error('Error loading friends:', error);
        });

      await new Promise(resolve => setTimeout(resolve, 500));
      console.log(fetchedFriends.length);
      setFriends(fetchedFriends.length)
    }
    
    useEffect(() => {
      fetchFriendsData();
    }, []);

    useEffect(() => {
      async function fetchData() {
        try {
          if (!id) {
            navigate('/');
            return;
          }
          const userReviews = await getReviewsByUser(id);
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

    useEffect(() => {
      async function checkFriend() {
        if (currentUser && id && currentUser.id !== parseInt(id)) {
          try {
            const status = await checkFriendStatus(currentUser.id, parseInt(id));
            setIsFriend(status);
          } catch (error) {
            console.error('Error checking friend status:', error);
          }
        }
      }
      checkFriend();
    }, [currentUser, id]);

    const handleFriendAction = async () => {
      if (!currentUser) {
        navigate('/login');
        return;
      }
      try {
        if (isFriend) {
          await removeFriend(currentUser.id, parseInt(id));
          setIsFriend(false);
        } else {
          await addFriend(currentUser.id, parseInt(id));
          setIsFriend(true);
        }
        fetchFriendsData();
      } catch (error) {
        console.error('Error updating friend status:', error);
      }
    };

  const recentActivity = reviews
    .map(review => {
      const song = songs.find(s => s && s.id === review.song_id);
      return {
        id: review.id,
        song: song ? song.name : 'Unknown Song',
        rating: review.stars,
        timestamp: new Date(review.created_at).toLocaleDateString(),
        description: review.description,
        coverArt: song?.album?.images?.[0]?.url || '/images/Blank Album Cover.svg'
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
        <Link to="/search" className="inline-flex items-center text-gray-400 hover:text-white mb-4">
          <ArrowLeft className="mr-2" size={20} />
        </Link>
        <div className="flex items-center gap-6 pl-8 mb-12">
          <div className="w-44 h-44 rounded-full bg-gray-600 overflow-hidden">
            <img src="/images/Blank User.svg" alt="Profile" className="w-full h-full object-cover" />
          </div>
          <div>
            <div className="text-sm text-white/60 mb-1">Profile</div>
            <h1 className="text-4xl text-white font-bold mb-2">{user}</h1>
            <div className="text-white/60">{reviews.length} Rankings • {friends} Friends</div>
            {currentUser && currentUser.id !== parseInt(id) && (
              <button
                onClick={handleFriendAction}
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
            )}
          </div>
        </div>
        {/* Main content grid */}
        <div className="grid grid-cols-2 gap-10 ml-6">
          {/* Recent Activity */}
          <div className="bg-neutral-200/10 rounded-lg p-6">
            <h2 className="text-3xl text-white font-bold mb-4">Recent Activity</h2>
            <div className="space-y-8">
              {recentActivity.length > 0 ? (
                recentActivity.map((activity) => (
                  <RecentActivity key={activity.id} activity={activity} />
                ))
              ) : (
                <p className="text-white">No reviews yet!</p>
              )}
            </div>
          </div>
          <div className="bg-neutral-200/10 rounded-lg p-6 mr-6">
            <h2 className="text-3xl text-white font-bold mb-4">Rankings</h2>
            <div className="grid grid-cols-2 grid-cols-3 gap-4">
              {rankings.length > 0 ? (
                rankings.map((song, index) => (
                  <RankedSongSm key={index} {...song} />
                ))
              ) : (
                <p className="text-white">No rankings yet!</p>
              )}
            </div>
            {/* <button className="w-full mt-4 p-2 text-gray-400 hover:text-white transition-colors">
              <ChevronDown className="w-6 h-6 mx-auto" />
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};