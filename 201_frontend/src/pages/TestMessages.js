import React, { useState, useEffect } from "react";
import Sidebar from "../components/layout/sidebar";
import { sendMessage, loadMessages, getCurrentUser } from '../utils/chat';
import { useNavigate } from 'react-router-dom';

const MessagesPage = () => {
  const navigate = useNavigate();
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [friends, setFriends] = useState([]); 
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    async function fetchFriendsData() {
      const current = getCurrentUser();
      if (!current) return;

      setCurrentUser(current);

      let fetchedFriends;
      fetch(`http://localhost:8080/FPP_9/chat/getFriends?user_id=${current.id}`, {
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
      console.log(fetchedFriends);

      setFriends(fetchedFriends);

      if (fetchedFriends && fetchedFriends.length > 0) {
        setSelectedFriend(fetchedFriends[0]);
        console.log('Selected friend:', fetchedFriends[0].friend_id);
      }

      console.log('Friends:', fetchedFriends);
    }

    fetchFriendsData();
  }, []);

  useEffect(() => {
    if (selectedFriend && currentUser) {
      fetchMessages(currentUser, selectedFriend);
    }
  }, [selectedFriend, currentUser]);

  const fetchMessages = (currentUser, friend) => {
    loadMessages(currentUser, friend, (messages) => {
      const filteredMessages = messages.filter(
        (msg) =>
          (parseInt(msg.sender) === currentUser.id && parseInt(msg.receiver) === friend.friend_id) ||
          (parseInt(msg.sender) === friend.friend_id && parseInt(msg.receiver) === currentUser.id)
      );
      console.log('Filtered messages:', filteredMessages);
      setMessages(filteredMessages);
    }, (error) => {
      console.error("Error fetching messages:", error);
    });
  };

  const handleSelectFriend = (friend) => {
    setSelectedFriend(friend); 
  };

  const handleSendMessage = () => {
    if (messageInput.trim() && selectedFriend && currentUser) {
      const newMessage = {
        sender: currentUser.id,
        receiver: selectedFriend.friend_id,
        message: messageInput,
      };

      sendMessage(newMessage, (data) => {
        if (data.success) {
          setMessages((prev) => [...prev, newMessage]); 
          setMessageInput(""); 
        } else {
          alert("Failed to send message");
        }
      }, (error) => {
        console.error("Error sending message:", error);
        alert("Failed to send message");
      });
    }
  };

  return (
    <div className="flex h-screen w-screen bg-[#393939]">
      <Sidebar activeTab="Messages" />
      <div className="flex flex-1 flex-col px-6 py-4">
        <div className="flex justify-between items-center bg-black/20 px-3 py-2 rounded-t-lg">
          <div className="flex items-center gap-3">
            <h3 className="text-white text-lg font-bold flex mt-2">
              {selectedFriend ? selectedFriend.friend_username : "No Friend Selected"}
            </h3>
          </div>
        </div>
        <div className="flex-1 bg-white/10 rounded-b-lg p-4 overflow-y-scroll">
          {messages.length > 0 ? (
            messages.map((msg, index) => (
              <div key={index} className="mb-4">
                <p
                  className={
                    parseInt(msg.sender) === currentUser?.id ? "text-[#4CAF50]" : "text-white"
                  }
                >
                  {parseInt(msg.sender) === currentUser?.id ? "You" : selectedFriend?.friend_username}: {msg.message}
                </p>
                {msg.song && (
                  <p className="text-[#4CAF50]">
                    <em>🎵 {msg.song}</em>
                  </p>
                )}
              </div>
            ))
          ) : (
            <p className="text-white">No messages yet. Start chatting!</p>
          )}
        </div>
        <div className="mt-3 flex items-center gap-2 rounded-full p-2">
          <input
            type="text"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 p-2 rounded-full bg-white/20 text-white ps-4 placeholder-white/70"
          />
          <button
            onClick={handleSendMessage}
            className="bg-[#50C878] text-white px-6 py-2 rounded-full hover:bg-[#4CAF50]/90"
          >
            Send
          </button>
        </div>
      </div>

      {/* Friends list on the right */}
      <div className="w-[300px] bg-black/20 p-4 flex flex-col place-items-start">
        <h3 className="text-white font-bold text-lg ml-3 mb-2 px-0 w-full">Start Chatting</h3>
        <div className="flex flex-col gap-2 place-items-start w-full ml-2 px-0">
          {friends.length > 0 ? (
            friends.map((friend) => (
              <div
                key={friend.friend_id}
                onClick={() => handleSelectFriend(friend)}
                className={`w-full p-2 text-left ps-4 text-white font-semibold cursor-pointer rounded-full ${
                  selectedFriend?.friend_id === friend.friend_id ? "bg-[#50C878]/90" : "hover:bg-[#50C878]/50"
                }`}
              >
                {friend.friend_username}
              </div>
            ))
          ) : (
            <div>
              <p className="text-white">Add friends to chat with them!</p>
              <button className="bg-white text-black/90 p-2 ml-2 rounded-full mt-6 w-60" onClick={() => navigate('/search')}>
                Find friends
              </button>
            </div>
          )}
        </div>
        </div>
      </div>
  );
};

export default MessagesPage;
