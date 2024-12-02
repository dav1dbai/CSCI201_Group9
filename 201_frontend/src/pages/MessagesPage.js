/*Hard-Coded Elements:
- Friends List ~ static list of names
- Initial Messages ~ some example messages
- Quick Replies ~ static replies
- Shared Song ~ "All I Want for Christmas is You" is hardcoded in the handleShareSong function
- Will probably have to replace frontend placeholder calls with real API calls
*/
import React, { useState } from "react";
import Sidebar from "../components/layout/sidebar"; // Reusable sidebar component for navigation

const MessagesPage = () => {
  // Tracks the currently selected friend for chatting
  const [selectedFriend, setSelectedFriend] = useState(null);

  // Stores the conversation messages
  const [messages, setMessages] = useState([
    {
      sender: "You",
      text: "This song is great!",
      song: "All I Want for Christmas is You - Mariah Carey",
    },
    { sender: "Sanya", text: "It totally is", song: null },
  ]);

  // Tracks the value of the message input field
  const [messageInput, setMessageInput] = useState("");

  // Hardcoded list of friends to display in the sidebar
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

  // Predefined quick replies for faster messaging
  const quickReplies = ["I agree!", "Amazing!", "Great!"];

  // Updates the selected friend and resets the message list
  const handleSelectFriend = (friend) => {
    setSelectedFriend(friend);
    setMessages([]); // Clear messages for now; replace with actual data fetching logic
  };

  // Sends a message by adding it to the current message list
  const handleSendMessage = () => {
    if (messageInput.trim()) {
      setMessages((prev) => [
        ...prev,
        { sender: "You", text: messageInput, song: null },
      ]);
      setMessageInput(""); // Clear the input field
    }
  };

  // Sends a predefined quick reply
  const handleQuickReply = (reply) => {
    setMessages((prev) => [...prev, { sender: "You", text: reply, song: null }]);
  };

  // Simulates sharing a song in the chat
  const handleShareSong = () => {
    setMessages((prev) => [
      ...prev,
      { sender: "You", text: "", song: "All I Want for Christmas is You" },
    ]);
  };

  return (
    // Main container with a flex layout for the sidebar and content
    <div className="flex min-h-screen bg-[#393939]">
      {/* Sidebar for navigation, with the active tab set to "Messages" */}
      <Sidebar activeTab="Messages" />

      {/* Main content area */}
      <div className="flex-1 p-8">
        <div className="grid grid-cols-3">
          {/* Left-hand side: List of friends */}
          <div className="bg-[#4CAF50] p-4 rounded-lg col-span-1">
            <h3 className="text-white font-bold mb-4">Start Chatting</h3>
            {/* Render each friend as a clickable list item */}
            <ul className="list-none">
              {friends.map((friend, index) => (
                <li
                  key={index}
                  onClick={() => handleSelectFriend(friend)}
                  className="p-2 text-white hover:bg-[#2E7D32] cursor-pointer rounded-md"
                >
                  {friend}
                </li>
              ))}
            </ul>
            {/* Button to create a new chat (not yet functional) */}
            <button className="bg-white text-[#4CAF50] p-2 rounded-md mt-4">
              Create Chat
            </button>
          </div>

          {/* Right-hand side: Chat interface */}
          <div className="bg-[#2C2C2C] p-4 rounded-lg col-span-2">
            {selectedFriend ? (
              <>
                {/* Display the name of the selected friend */}
                <h3 className="text-white font-bold">{selectedFriend}</h3>

                {/* Chat messages area */}
                <div className="bg-black p-4 mt-4 rounded-lg overflow-y-scroll h-80">
                  {messages.length > 0 ? (
                    // Render each message with sender-specific styling
                    messages.map((msg, index) => (
                      <div key={index} className="mb-4">
                        <p
                          className={
                            msg.sender === "You"
                              ? "text-[#4CAF50]"
                              : "text-white"
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
                    // Message displayed when there are no messages
                    <p className="text-white">No messages yet. Start chatting!</p>
                  )}
                </div>

                {/* Input area for sending messages */}
                <div className="mt-4 flex gap-2">
                  <input
                    type="text"
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 p-2 rounded-md"
                  />
                  <button
                    onClick={handleSendMessage}
                    className="bg-white text-[#4CAF50] p-2 rounded-md"
                  >
                    Send
                  </button>
                  <button
                    onClick={handleShareSong}
                    className="bg-white text-[#4CAF50] p-2 rounded-md"
                  >
                    Share Song
                  </button>
                </div>

                {/* Quick reply buttons */}
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
              </>
            ) : (
              // Prompt to select a friend if none is selected
              <p className="text-white">Select a friend to start chatting!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;

/*
Questions I have for group meeting:
1. Is the friends list gonna be static/hardcoded or will each user that logs in have their own populated list of friends? i.e. real-world updates
2. Are users able to add/remove friends? i.e. if a new friend is added, the friends list should refresh.
if a new message is sent or received, the message list should update automatically.
3. When a user clicks on a chat with a friend should previous messages be shown or does it start from a blank chat?
4. Are messages gonna be saved when a user sends them? 
*/
