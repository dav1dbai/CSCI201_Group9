//test page for messages
import React, { useState } from "react";
import { Bell, Settings, MoreHorizontal, User, Smile, Paperclip, Mic, Edit } from "lucide-react"; // Added icons
import Sidebar from "../components/layout/sidebar"; // Sidebar for navigation

const MessagesPage = () => {
  const [selectedFriend, setSelectedFriend] = useState("Sanya");
  const [messages, setMessages] = useState([
    {
      sender: "You",
      text: "This song is great!",
      song: "All I Want for Christmas is You - Mariah Carey",
    },
    { sender: "Sanya", text: "It totally is", song: null },
  ]);
  const [messageInput, setMessageInput] = useState("");

  const friends = [
    "Sanya",
    "Vitor",
    "Alex",
    "David",
    "Emmanuela",
    "Eric",
    "Malia",
    "Toayo",
  ];

  const quickReplies = ["I agree!", "Amazing!", "Great!"];

  const handleSelectFriend = (friend) => {
    setSelectedFriend(friend);
    setMessages([]); // Clear messages (replace with actual data fetching logic if necessary)
  };

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      setMessages((prev) => [
        ...prev,
        { sender: "You", text: messageInput, song: null },
      ]);
      setMessageInput("");
    }
  };

  const handleQuickReply = (reply) => {
    setMessages((prev) => [...prev, { sender: "You", text: reply, song: null }]);
  };

  const handleShareSong = () => {
    setMessages((prev) => [
      ...prev,
      { sender: "You", text: "", song: "All I Want for Christmas is You" },
    ]);
  };

  return (
    <div className="flex h-screen w-screen bg-[#393939]">
      {/* Sidebar on the left */}
      <Sidebar activeTab="Messages" />

      {/* Chat section */}
      <div className="flex flex-1 flex-col px-6 py-4">
        {/* Top bar with friend name, icons, and separator */}
        <div className="flex justify-between items-center bg-[#2C2C2C] p-4 rounded-t-lg">
          <div className="flex items-center gap-3">
            <User className="text-white w-6 h-6" /> {/* Friend icon */}
            <h3 className="text-white text-lg font-bold">{selectedFriend}</h3>
          </div>
          <div className="flex items-center gap-4">
            <Bell className="text-white w-6 h-6 cursor-pointer hover:text-[#4CAF50]" /> {/* Notifications */}
            <Settings className="text-white w-6 h-6 cursor-pointer hover:text-[#4CAF50]" /> {/* Settings */}
            <MoreHorizontal className="text-white w-6 h-6 cursor-pointer hover:text-[#4CAF50]" /> {/* Three dots */}
          </div>
        </div>

        {/* Messages container */}
        <div className="flex-1 bg-black rounded-b-lg p-4 overflow-y-scroll">
          {messages.length > 0 ? (
            messages.map((msg, index) => (
              <div key={index} className="mb-4">
                <p
                  className={
                    msg.sender === "You" ? "text-[#4CAF50]" : "text-white"
                  }
                >
                  {msg.sender}: {msg.text}
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
        <div className="mt-4 flex items-center gap-2 bg-[#2C2C2C] rounded-lg p-2">
          {/* Emoji Picker */}
          <Smile className="text-white w-6 h-6 cursor-pointer hover:text-[#4CAF50]" title="Add Emoji" />
          
          {/* Attach Files */}
          <Paperclip className="text-white w-6 h-6 cursor-pointer hover:text-[#4CAF50]" title="Attach File" />

          {/* Text editing symbol */}
          <Edit className="text-white w-6 h-6 cursor-pointer hover:text-[#4CAF50]" title="Text Formatting" />

          {/* Message input */}
          <input
            type="text"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 p-2 rounded-md bg-[#393939] text-white placeholder-gray-400"
          />

          {/* Microphone */}
          <Mic className="text-white w-6 h-6 cursor-pointer hover:text-[#4CAF50]" title="Record Audio" />
        </div>

        {/* Quick replies */}
        <div className="mt-2 flex gap-2">
          {quickReplies.map((reply, index) => (
            <button
              key={index}
              onClick={() => handleQuickReply(reply)}
              className="bg-[#4CAF50] text-white p-2 rounded-md"
            >
              {reply}
            </button>
          ))}
        </div>
      </div>

      {/* Friends list on the right */}
      <div className="w-[300px] bg-[#4CAF50] p-4 flex flex-col items-center">
        <h3 className="text-white font-bold text-lg mb-4">Start Chatting</h3>
        <ul className="flex flex-col gap-2 items-center w-full">
          {friends.map((friend, index) => (
            <li
              key={index}
              onClick={() => handleSelectFriend(friend)}
              className={`w-3/4 p-2 text-center text-white cursor-pointer rounded-md ${
                selectedFriend === friend ? "bg-[#BAECCA]" : "hover:bg-[#2E7D32]"
              }`}
            >
              {friend}
            </li>
          ))}
        </ul>
        <button className="bg-white text-[#4CAF50] p-2 rounded-md mt-6 w-3/4">
          Create Chat
        </button>
      </div>
    </div>
  );
};

export default MessagesPage;

  