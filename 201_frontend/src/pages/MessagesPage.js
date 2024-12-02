/*Hard-Coded Elements:
- Friends List ~ static list of names
- Initial Messages ~ some example messages
- Quick Replies ~ static replies
- Shared Song ~ "All I Want for Christmas is You" is hardcoded in the handleShareSong function
- Will probably have to replace frontend placeholder calls with real API calls
*/
/*
Questions I have for group meeting:
1. Is the friends list gonna be static/hardcoded or will each user that logs in have their own populated list of friends? i.e. real-world updates
2. Are users able to add/remove friends? i.e. if a new friend is added, the friends list should refresh.
if a new message is sent or received, the message list should update automatically.
3. When a user clicks on a chat with a friend should previous messages be shown or does it start from a blank chat?
4. Are messages gonna be saved when a user sends them? 
*/
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
        <div className="flex justify-between items-center bg-black/20 px-3 py-2 rounded-t-lg">
          <div className="flex items-center gap-3">
            <User className="text-white w-6 h-6" /> {/* Friend icon */}
            <h3 className="text-white text-lg font-bold flex mt-2">{selectedFriend}</h3>
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
        </div>

        {/* Quick replies */}
        <div className="mt-3 flex gap-2">
          {quickReplies.map((reply, index) => (
            <button
              key={index}
              onClick={() => handleQuickReply(reply)}
              className="bg-[#50C878]/90 text-sm font-medium ps-3 pe-3 leading-5 text-white p-2 rounded-full"
            >
              {reply}
            </button>
          ))}
        </div>
      </div>

      {/* Friends list on the right */}
      <div className="w-[300px] bg-black/20 p-4 flex flex-col place-items-start">
        <h3 className="text-white font-bold text-lg ml-3 mb-2 px-0 w-full">Start Chatting</h3>
        <div className="flex flex-col gap-2 place-items-start w-full ml-2 px-0">
          {friends.map((friend, index) => (
            <div
              key={index}
              onClick={() => handleSelectFriend(friend)}
              className={`w-full p-2 text-left ps-4 text-white font-semibold cursor-pointer rounded-full ${
                selectedFriend === friend ? "bg-[#50C878]/90" : "hover:bg-[#50C878]/50"
              }`}
            >
              {friend}
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