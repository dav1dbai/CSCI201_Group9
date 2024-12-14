
import React, { useState, useEffect } from 'react';
import Sidebar from '../components/layout/sidebar';
import { Search } from 'lucide-react';
import UserCard from '../components/search/UserCard';
import { Song } from '../components/shared/Song';
import { getAllUsers } from '../utils/auth';
import { getCurrentUser } from '../utils/chat';

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [tracks, setTracks] = useState([]);
  const [users, setUsers] = useState([]); 
  const [currentUser, setCurrentUser] = useState("");

  const CLIENT_ID = "392b2c9d11614872b2c64a82d5f70c64";
  const CLIENT_SECRET = "744a4ef0ff964402a3a70b98cf9fadbe";  

  useEffect(() => {
    async function fetchUsers() {
      let current = await getCurrentUser();
      setCurrentUser(current);

      if (!current) {
        console.log('No current user');
        return;
      }

      let fetchedUsers = await getAllUsers();
      console.log(fetchedUsers);
      setUsers(fetchedUsers.users);
      console.log('Users:', users);
    }

    fetchUsers();
  }, []); 
  
  useEffect(() => {
    var authParameters = {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: 'grant_type=client_credentials&client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET
    }
    fetch('https://accounts.spotify.com/api/token', authParameters)
      .then(result => result.json())
      .then(data => setAccessToken(data.access_token))
  }, [])

  async function search() {
    console.log("Search for: " + searchQuery);
    if (searchQuery === "") {
      return;
    }
    var searchParameters = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + accessToken}
    } 
     await fetch('https://api.spotify.com/v1/search?q=' + searchQuery + '&type=track&limit=12', searchParameters)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setTracks(data.tracks.items);
      });
  }
  
  return (
    <div className="flex min-h-screen bg-[#393939]">
      <Sidebar />
      <div className="flex-1 p-8">
        <div className="relative mb-8">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onKeyDown={event => {
              if (event.key === "Enter"){
                search();
              }
            }}
            onChange={event => setSearchQuery(event.target.value)}
            className="w-full bg-white rounded-2xl py-2 px-8 pl-12 text-black"
          />
          <Search className="absolute left-3 top-2.5 text-gray-900" size={20} />
        </div> 

        <section className="mb-8 mx-2">
          <h2 className="text-xl text-white font-bold mb-3">People</h2>
          <div className="grid grid-cols- lg:grid-cols-6 gap-4">
          {users
          .filter((u) => u.id !== currentUser.id) // don't show own card
          .map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
          </div>
        </section>

        <section className="mb-8 mx-2">
          <h2 className="text-xl text-white font-bold mb-3">Song Results</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {tracks.map((track, i ) => {
              console.log(track.name);
              console.log(track.artists[0].name);
              console.log(track.album.images[0]);
              return (
                <Song key={i} id={track.id} title={track.name} artist={track.artists[0].name} image={track.album.images[0].url}/>
              )
            })} 
          </div>
        </section>
      </div>
    </div>
    )
  }