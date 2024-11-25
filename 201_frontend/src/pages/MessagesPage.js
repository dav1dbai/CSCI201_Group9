// /*Hard-Coded Elements:
// - Friends List ~ static list of names
// - Initial Messages ~ some example messages
// - Quick Replies ~ static replies
// - Shared Song ~ "All I Want for Christmas is You" is hardcoded in the handleShareSong function
// - Will probably have to replace frontend placeholder calls with real API calls
// */
// import React, { useState } from "react";

// const MessagesPage = () => {
//   // Tracks the currently selected friend for chatting
//   const [selectedFriend, setSelectedFriend] = useState(null);

//   // Stores the conversation messages. Each message includes:
//   // - 'sender': Who sent the message (e.g., "You" or the friend's name)
//   // - 'text': The message content
//   // - 'song': Optional song information shared in the conversation
//   const [messages, setMessages] = useState([
//     {
//       sender: "You",
//       text: "This song is great!",
//       song: "All I Want for Christmas is You - Mariah Carey",
//     },
//     { sender: "Sanya", text: "It totally is", song: null },
//   ]);

//   // Tracks the current value of the text input box for the user's message
//   const [messageInput, setMessageInput] = useState("");

//   // A list of friends displayed on the left-hand panel (static data for now)
//   const friends = [
//     "Sanya",
//     "Vitor",
//     "Alex",
//     "David",
//     "Emmanuela",
//     "Eric",
//     "Malia",
//     "Toayo",
//   ];

//   // Quick reply options for the user to respond quickly in the chat
//   const quickReplies = ["I agree!", "Amazing!", "Great!"];

//   // Handles selecting a friend from the list
//   // Updates the `selectedFriend` state and clears messages (for demo purposes)
//   const handleSelectFriend = (friend) => {
//     setSelectedFriend(friend);

//     // For now, we reset the messages when switching friends
//     // Replace this with real chat data fetching logic in a production app
//     setMessages([]);
//   };

//   // Handles sending a message typed by the user
//   const handleSendMessage = () => {
//     if (messageInput.trim()) {
//       // Add the user's message to the messages array
//       setMessages((prev) => [
//         ...prev,
//         { sender: "You", text: messageInput, song: null },
//       ]);
//       // Clear the input box after sending the message
//       setMessageInput("");
//     }
//   };

//   // Handles quick reply clicks
//   // Adds a pre-defined quick reply to the conversation
//   const handleQuickReply = (reply) => {
//     setMessages((prev) => [...prev, { sender: "You", text: reply, song: null }]);
//   };

//   // Simulates sharing a song in the chat
//   // Adds a message containing song details to the conversation
//   const handleShareSong = () => {
//     setMessages((prev) => [
//       ...prev,
//       { sender: "You", text: "", song: "All I Want for Christmas is You" },
//     ]);
//   };

//   return (
//     <div style={{ display: "flex", height: "100vh" }}>
//       {/* Left-hand panel: Friend list */}
//       <div
//         style={{
//           width: "30%", // Panel takes up 30% of the width
//           backgroundColor: "#4CAF50", // Green background
//           padding: "10px", // Padding for spacing
//           color: "#FFF", // White text for contrast
//         }}
//       >
//         <h3>Start Chatting</h3>
//         {/* Display each friend as a clickable item */}
//         <ul style={{ listStyle: "none", padding: 0 }}>
//           {friends.map((friend, index) => (
//             <li
//               key={index}
//               onClick={() => handleSelectFriend(friend)} // Switch to the selected friend's chat
//               style={{
//                 padding: "10px",
//                 cursor: "pointer",
//                 borderBottom: "1px solid #FFF", // Separator between friends
//               }}
//             >
//               {friend}
//             </li>
//           ))}
//         </ul>
//         {/* Button to create a new chat (not implemented yet) */}
//         <button
//           style={{
//             backgroundColor: "#FFF", // White button
//             color: "#4CAF50", // Green text
//             border: "none",
//             padding: "10px",
//             cursor: "pointer",
//             marginTop: "10px",
//           }}
//         >
//           Create Chat
//         </button>
//       </div>

//       {/* Right-hand panel: Chat interface */}
//       <div
//         style={{
//           flex: 1, // Panel takes up remaining space
//           backgroundColor: "#2C2C2C", // Dark gray background
//           padding: "10px", // Padding for spacing
//           display: "flex", // Flex layout for positioning
//           flexDirection: "column", // Stack items vertically
//         }}
//       >
//         {/* If a friend is selected, show their chat; otherwise prompt user to select */}
//         {selectedFriend ? (
//           <>
//             {/* Display the selected friend's name */}
//             <h3 style={{ color: "#FFF" }}>{selectedFriend}</h3>

//             {/* Chat message area */}
//             <div
//               style={{
//                 flex: 1, // Takes up remaining vertical space
//                 backgroundColor: "#1C1C1C", // Darker gray for chat area
//                 padding: "10px", // Padding for spacing
//                 overflowY: "scroll", // Enable scrolling for long chats
//               }}
//             >
//               {messages.length > 0 ? (
//                 // Render each message
//                 messages.map((msg, index) => (
//                   <div key={index} style={{ margin: "10px 0" }}>
//                     <p
//                       style={{
//                         color: msg.sender === "You" ? "#4CAF50" : "#FFF", // Green for user's messages, white for others
//                       }}
//                     >
//                       {msg.sender}: {msg.text}
//                     </p>
//                     {msg.song && (
//                       <p style={{ color: "#4CAF50" }}>
//                         <em>🎵 {msg.song}</em>
//                       </p>
//                     )}
//                   </div>
//                 ))
//               ) : (
//                 <p style={{ color: "#FFF" }}>No messages yet. Start chatting!</p>
//               )}
//             </div>

//             {/* Input area for sending messages */}
//             <div style={{ marginTop: "10px" }}>
//               <div style={{ display: "flex", marginBottom: "10px" }}>
//                 {/* Text input box */}
//                 <input
//                   type="text"
//                   value={messageInput} // Controlled input tied to `messageInput` state
//                   onChange={(e) => setMessageInput(e.target.value)} // Update input value
//                   placeholder="Type a message..."
//                   style={{
//                     flex: 1, // Input takes up available space
//                     padding: "10px",
//                     marginRight: "5px",
//                   }}
//                 />
//                 {/* Send message button */}
//                 <button
//                   onClick={handleSendMessage}
//                   style={{
//                     padding: "10px",
//                     marginRight: "5px",
//                     backgroundColor: "#FFF",
//                     color: "#4CAF50",
//                     border: "none",
//                     cursor: "pointer",
//                   }}
//                 >
//                   Send
//                 </button>
//                 {/* Share song button */}
//                 <button
//                   onClick={handleShareSong}
//                   style={{
//                     padding: "10px",
//                     backgroundColor: "#FFF",
//                     color: "#4CAF50",
//                     border: "none",
//                     cursor: "pointer",
//                   }}
//                 >
//                   Share Song
//                 </button>
//               </div>

//               {/* Quick reply buttons */}
//               <div style={{ display: "flex", gap: "10px" }}>
//                 {quickReplies.map((reply, index) => (
//                   <button
//                     key={index}
//                     onClick={() => handleQuickReply(reply)} // Sends the quick reply
//                     style={{
//                       padding: "5px",
//                       backgroundColor: "#4CAF50",
//                       color: "#FFF",
//                       border: "none",
//                       cursor: "pointer",
//                     }}
//                   >
//                     {reply}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           </>
//         ) : (
//           // Prompt to select a friend if none is selected
//           <p style={{ color: "#FFF" }}>Select a friend to start chatting!</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MessagesPage;

/*
Questions I have for group meeting:
1. Is the friends list gonna be static/hardcoded or will each user that logs in have their own populated list of friends? i.e. real-world updates
2. Are users able to add/remove friends? i.e. if a new friend is added, the friends list should refresh.
if a new message is sent or received, the message list should update automatically.
3. When a user clicks on a chat with a friend should previous messages be shown or does it start from a blank chat?
4. Are messages gonna be saved when a user sends them? 
*/
//VERSION #2 ~ just playing around with the design 
// import React, { useState } from "react";

// // Main component for the chat interface
// function MessagesPage() {
//   // State hooks for managing chat interactions and input
//   const [selectedFriend, setSelectedFriend] = useState(null); // Stores the selected friend
//   const [messages, setMessages] = useState([]); // Stores the array of chat messages
//   const [messageInput, setMessageInput] = useState(""); // Stores the current input message
  
//   // List of friends to display on the left panel
//   const friendsList = [
//     "Sanya", "Vitor", "Alex", "David", "Emmanuela", "Eric", "Malia", "Toayo"
//   ];

//   // Function to handle selecting a friend from the friends list
//   const selectFriend = (friend) => {
//     setSelectedFriend(friend); // Sets the selected friend
//     setMessages([{ sender: "", text: "No messages yet. Start chatting!" }]); // Reset chat window with placeholder message
//   };

//   // Function to handle sending a new message
//   const sendMessage = () => {
//     if (messageInput.trim()) { // Check if the message is not empty
//       setMessages([...messages, { sender: "You", text: messageInput }]); // Add the message to the chat
//       setMessageInput(""); // Clear the input field
//     }
//   };

//   // Function to handle quick reply buttons
//   const quickReply = (reply) => {
//     setMessages([...messages, { sender: "You", text: reply }]); // Add the quick reply to the chat
//   };

//   // Function to share a song
//   const shareSong = () => {
//     setMessages([...messages, { sender: "You", text: "", song: "🎵 All I Want for Christmas is You" }]); // Add the song to the chat
//   };

//   return (
//     <div className="chat-container">
//       {/* Embedding the styles directly inside the component */}
//       <style>{`
//         body {
//           font-family: Arial, sans-serif;
//           margin: 0;
//           padding: 0;
//           background-color: #2C2C2C;
//           color: white;
//         }

//         .chat-container {
//           display: flex;
//           height: 100vh;
//         }

//         /* Friends Panel */
//         .friends-panel {
//           width: 30%;
//           background-color: #4CAF50;
//           padding: 20px;
//         }

//         .friends-panel h3 {
//           margin-top: 0;
//         }

//         .friends-list {
//           list-style: none;
//           padding: 0;
//         }

//         .friends-list li {
//           padding: 10px;
//           cursor: pointer;
//           border-bottom: 1px solid white;
//         }

//         .friends-list li:hover {
//           background-color: #357a38;
//         }

//         .create-chat-btn {
//           background-color: white;
//           color: #4CAF50;
//           border: none;
//           padding: 10px;
//           margin-top: 10px;
//           cursor: pointer;
//         }

//         .create-chat-btn:hover {
//           background-color: #ccc;
//         }

//         /* Chat Panel */
//         .chat-panel {
//           flex: 1;
//           display: flex;
//           flex-direction: column;
//           padding: 20px;
//           background-color: #1C1C1C;
//         }

//         .chat-header h3 {
//           margin: 0;
//         }

//         .chat-messages {
//           flex: 1;
//           overflow-y: auto;
//           margin: 10px 0;
//           padding: 10px;
//           background-color: #2C2C2C;
//           border: 1px solid #4CAF50;
//         }

//         .no-messages {
//           text-align: center;
//           color: #aaa;
//         }

//         .chat-input {
//           display: flex;
//           gap: 10px;
//         }

//         .chat-input input {
//           flex: 1;
//           padding: 10px;
//         }

//         .chat-input button {
//           background-color: #4CAF50;
//           color: white;
//           border: none;
//           padding: 10px;
//           cursor: pointer;
//         }

//         .chat-input button:hover {
//           background-color: #357a38;
//         }

//         .quick-replies {
//           display: flex;
//           gap: 10px;
//           margin-top: 10px;
//         }

//         .quick-replies button {
//           background-color: #4CAF50;
//           color: white;
//           border: none;
//           padding: 5px 10px;
//           cursor: pointer;
//         }

//         .quick-replies button:hover {
//           background-color: #357a38;
//         }

//         .chat-container {
//           display: flex;
//           flex-direction: row-reverse; /* Swaps the friends list to the right */
//         }
//       `}</style>

//       {/* Friends Panel */}
//       <div className="friends-panel">
//         <h3>Start Chatting</h3>
//         <ul className="friends-list">
//           {/* Dynamically render the friends list */}
//           {friendsList.map((friend) => (
//             <li key={friend} onClick={() => selectFriend(friend)}>
//               {friend} {/* Click on a friend's name to start chatting */}
//             </li>
//           ))}
//         </ul>
//         <button className="create-chat-btn">Create Chat</button>
//       </div>

//       {/* Chat Interface Panel */}
//       <div className="chat-panel">
//         <div id="chat-header" className="chat-header">
//           <h3 id="friend-name">{selectedFriend ? selectedFriend : "Select a friend to start chatting!"}</h3>
//         </div>
//         <div id="chat-messages" className="chat-messages">
//           {/* Render chat messages dynamically */}
//           {messages.map((msg, index) => (
//             <div key={index} style={{ margin: "10px 0" }}>
//               <p style={{ color: msg.sender === "You" ? "#4CAF50" : "white" }}>
//                 {msg.sender}: {msg.text}
//               </p>
//               {/* Display song if available */}
//               {msg.song && <p style={{ color: "#4CAF50" }}><em>{msg.song}</em></p>}
//             </div>
//           ))}
//         </div>
//         <div className="chat-input">
//           <input
//             type="text"
//             id="message-input"
//             placeholder="Type a message..."
//             value={messageInput} // Bind input value to state
//             onChange={(e) => setMessageInput(e.target.value)} // Update state when input changes
//           />
//           <button onClick={sendMessage}>Send</button> {/* Send message on click */}
//           <button onClick={shareSong}>Share Song</button> {/* Share song on click */}
//         </div>
//         <div className="quick-replies">
//           {/* Quick reply buttons */}
//           <button onClick={() => quickReply("I agree!")}>I agree!</button>
//           <button onClick={() => quickReply("Amazing!")}>Amazing!</button>
//           <button onClick={() => quickReply("Great!")}>Great!</button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default MessagesPage;

// import React, { useState } from 'react';

// const MessagesPage = () => {
//   const [selectedFriend, setSelectedFriend] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [messageInput, setMessageInput] = useState('');

//   const friends = ['Malia', 'Alex', 'Sanya', 'Emmanuela'];

//   const handleSelectFriend = (friend) => {
//     setSelectedFriend(friend);
//     setMessages([]); // Clear the chat when a new friend is selected
//   };

//   const handleSendMessage = () => {
//     if (messageInput.trim()) {
//       setMessages((prevMessages) => [
//         ...prevMessages,
//         { sender: 'You', text: messageInput },
//       ]);
//       setMessageInput('');
//     }
//   };

//   const handleQuickReply = (reply) => {
//     setMessages((prevMessages) => [
//       ...prevMessages,
//       { sender: 'You', text: reply },
//     ]);
//   };

//   return (
//     <div style={{ display: 'flex', height: '100vh' }}>
//       {/* Left Half: Chat Room */}
//       <div style={{ flex: 2, backgroundColor: '#f0f0f0', padding: '20px' }}>
//         {selectedFriend ? (
//           <>
//             <h2>Chat with {selectedFriend}</h2>
//             <div
//               style={{
//                 flex: 1,
//                 backgroundColor: '#fff',
//                 border: '1px solid #ccc',
//                 borderRadius: '8px',
//                 padding: '10px',
//                 marginBottom: '20px',
//                 overflowY: 'auto',
//                 height: '60vh',
//               }}
//             >
//               {messages.length > 0 ? (
//                 messages.map((message, index) => (
//                   <p key={index}>
//                     <strong>{message.sender}:</strong> {message.text}
//                   </p>
//                 ))
//               ) : (
//                 <p>No messages yet. Start chatting!</p>
//               )}
//             </div>
//             <div style={{ display: 'flex', gap: '10px' }}>
//               <input
//                 type="text"
//                 value={messageInput}
//                 onChange={(e) => setMessageInput(e.target.value)}
//                 placeholder="Type a message..."
//                 style={{
//                   flex: 1,
//                   padding: '10px',
//                   borderRadius: '4px',
//                   border: '1px solid #ccc',
//                 }}
//               />
//               <button
//                 onClick={handleSendMessage}
//                 style={{
//                   padding: '10px 20px',
//                   backgroundColor: '#007bff',
//                   color: '#fff',
//                   border: 'none',
//                   borderRadius: '4px',
//                   cursor: 'pointer',
//                 }}
//               >
//                 Send
//               </button>
//             </div>
//           </>
//         ) : (
//           <h2>Select a friend to start chatting</h2>
//         )}
//       </div>

//       {/* Right Half: Friends List and Options */}
//       <div style={{ flex: 1, backgroundColor: '#e6ffe6', padding: '20px' }}>
//         <h3>Friends List</h3>
//         <ul style={{ listStyle: 'none', padding: 0 }}>
//           {friends.map((friend, index) => (
//             <li
//               key={index}
//               onClick={() => handleSelectFriend(friend)}
//               style={{
//                 padding: '10px',
//                 margin: '5px 0',
//                 backgroundColor: '#fff',
//                 border: '1px solid #ccc',
//                 borderRadius: '4px',
//                 cursor: 'pointer',
//               }}
//             >
//               {friend}
//             </li>
//           ))}
//         </ul>
//         <button
//           style={{
//             marginTop: '20px',
//             padding: '10px',
//             backgroundColor: '#007bff',
//             color: '#fff',
//             border: 'none',
//             borderRadius: '4px',
//             cursor: 'pointer',
//           }}
//         >
//           Create Chat
//         </button>
//       </div>
//     </div>
//   );
// };

// export default MessagesPage;
