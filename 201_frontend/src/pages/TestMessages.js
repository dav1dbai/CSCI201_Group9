import React, { useState, useEffect } from "react";
import { Bell, Settings, MoreHorizontal, User, Smile, Paperclip, Mic, Edit } from "lucide-react"; // Added icons
import Sidebar from "../components/layout/sidebar"; // Sidebar for navigation
import { sendMessage, loadMessages, getCurrentUser } from '../utils/chat';
import { getAllUsers } from '../utils/auth';

const MessagesPage = () => {
  const [selectedFriend, setSelectedFriend] = useState("");
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [friends, setFriends] = useState([]);  // state for storing the list of friends (users)
  const [currentUser, setCurrentUser] = useState(null);

  // Load users on page load
  useEffect(() => {
    async function fetchUsers() {
      const users = await getAllUsers();
      setCurrentUser(getCurrentUser());
      console.log('Users:', users);
      setFriends(users.users); // Populate the friends list with the fetched users
      if (users.users.length > 0) {
        setSelectedFriend(users.users[0]); // Update to use username property
        console.log('Selected friend:', users.users[0].id);
      }
      console.log('Friends:', friends);
    }
    fetchUsers();
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  // Fetch messages when selectedFriend changes
  useEffect(() => {
    if (selectedFriend) {
      const currentUser = getCurrentUser(); // Fetch the current user's username
      fetchMessages(currentUser, selectedFriend); // Fetch messages for the selected friend
    }
  }, [selectedFriend]);

  // Fetch messages based on current user and selected friend
  const fetchMessages = (currentUser, friend) => {
    loadMessages(currentUser, friend, (messages) => {
      const filteredMessages = messages.filter(
        (msg) =>
          (parseInt(msg.sender) === currentUser.id && parseInt(msg.receiver) === friend.id) ||
          (parseInt(msg.sender) === friend.id && parseInt(msg.receiver) === currentUser.id)
      );
      console.log('Filtered messages:', filteredMessages);
      setMessages(filteredMessages);
    }, (error) => {
      console.error("Error fetching messages:", error);
    });
  };

  const handleSelectFriend = (friend) => {
    setSelectedFriend(friend); // Update to use username property
  };
  
  // Handle sending a message
  const handleSendMessage = () => { // Fetch the current user's username
    if (messageInput.trim()) {
      const newMessage = {
        sender: currentUser.id,
        receiver: selectedFriend.id,
        message: messageInput,
      };

      sendMessage(newMessage, (data) => {
        if (data.success) {
          setMessages((prev) => [...prev, newMessage]); // Append message to the chat
          setMessageInput(""); // Clear input field
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
      {/* Sidebar on the left */}
      <Sidebar activeTab="Messages" />

      {/* Chat section */}
      <div className="flex flex-1 flex-col px-6 py-4">
        {/* Top bar with friend name, icons, and separator */}
        <div className="flex justify-between items-center bg-black/20 px-3 py-2 rounded-t-lg">
          <div className="flex items-center gap-3">
            <User className="text-white w-6 h-6" /> {/* Friend icon */}
            <h3 className="text-white text-lg font-bold flex mt-2">{selectedFriend.username}</h3>
          </div>
          <div className="flex justify-center items-center gap-4">
            <Bell className="text-white w-6 h-6 cursor-pointer hover:text-[#4CAF50]" /> {/* Notifications */}
            <Settings className="text-white w-6 h-6 cursor-pointer hover:text-[#4CAF50]" /> {/* Settings */}
            <MoreHorizontal className="text-white w-6 h-6 cursor-pointer hover:text-[#4CAF50]" /> {/* Three dots */}
          </div>
        </div>

        {/* Messages container */}
        <div className="flex-1 bg-white/10 rounded-b-lg p-4 overflow-y-scroll">
          {messages.length > 0 ? (
            messages.map((msg, index) => (
              <div key={index} className="mb-4">
                <p
                  className={
                    parseInt(msg.sender) === currentUser.id ? "text-[#4CAF50]" : "text-white"
                  }
                >
                  {parseInt(msg.sender) === currentUser.id ? "You" : selectedFriend.username}: {msg.message}
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

        {/* Input area */}
        {/* Message input and send button */}
        <div className="mt-3 flex items-center gap-2 rounded-full p-2">
          {/* Emoji Picker */}
          <Smile className="ml-2 text-white w-6 h-6 cursor-pointer hover:text-[#4CAF50]" title="Add Emoji" />

          {/* Attach Files */}
          <Paperclip className="text-white w-6 h-6 cursor-pointer hover:text-[#4CAF50]" title="Attach File" />

          {/* Text editing symbol */}
          <Edit className="text-white w-6 h-6 cursor-pointer hover:text-[#4CAF50] mr-2" title="Text Formatting" />

          {/* Message input */}
          <input
            type="text"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 p-2 rounded-full bg-white/20 text-white ps-4 placeholder-white/70"
          />

          {/* Microphone */}
          <Mic className="text-white w-6 h-6 cursor-pointer hover:text-[#4CAF50]" title="Record Audio" />

          {/* Send button */}
          <button
            onClick={handleSendMessage}
            className="bg-[#50C878] text-white px-6 py-2 rounded-full hover:bg-[#4CAF50]/90"
          >
            Send
          </button>
        </div>


        {/* <div className="mt-3 flex gap-2">
          {quickReplies.map((reply, index) => (
            <button
              key={index}
              onClick={() => handleQuickReply(reply)}
              className="bg-[#50C878]/90 text-sm font-medium ps-3 pe-3 leading-5 text-white p-2 rounded-full"
            >
              {reply}
            </button>
          ))}
        </div> */}
      </div>

      {/* Friends list on the right */}
      <div className="w-[300px] bg-black/20 p-4 flex flex-col place-items-start">
        <h3 className="text-white font-bold text-lg ml-3 mb-2 px-0 w-full">Start Chatting</h3>
        <div className="flex flex-col gap-2 place-items-start w-full ml-2 px-0">
          {friends.map((friend) => (
            <div
              key={friend.id}
              onClick={() => handleSelectFriend(friend)}
              className={`w-full p-2 text-left ps-4 text-white font-semibold cursor-pointer rounded-full ${
                selectedFriend === friend.username ? "bg-[#50C878]/90" : "hover:bg-[#50C878]/50"
              }`}
            >
              {friend.username}
            </div>
          ))}
        </div>
        <button className="bg-white text-black/90 p-2 ml-2 rounded-full mt-6 w-60">
          Create Chat
        </button>
      </div>
    </div>
  );
};

export default MessagesPage;
