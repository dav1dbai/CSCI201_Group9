const API_BASE_URL = 'http://localhost:8080/FPP_9/chat';

export const getCurrentUser = () => {
  const user = localStorage.getItem('user');
  console.log('Current user from localStorage:', user);
  return user ? JSON.parse(user)[0] : null;
};

export const sendMessage = (messageData, onSend, onError) => {
  fetch(`${API_BASE_URL}/sendMessage?sender=${messageData.sender}&receiver=${messageData.receiver}&message=${messageData.message}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        onSend(data);
      } else {
        onError("Failed to send message"); 
      }
    })
    .catch((error) => {
      console.error('Error sending message:', error);
      onError(error); 
    });
};

export const loadMessages = (sender, recipient, onLoad, onError) => {
  console.log('Sender:', sender.id);
  console.log('Recipient:', recipient.id);
  fetch(`${API_BASE_URL}/loadMessages?sender=${sender.id}&receiver=${recipient.id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.messages) {
        onLoad(data.messages);
      } else {
        onError("No messages found or failed to load messages.");
      }
      console.log('Messages loaded:', data.messages);
    })
    .catch((error) => {
      console.error('Error loading messages:', error);
      onError(error); 
    });
};


