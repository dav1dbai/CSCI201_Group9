const API_BASE_URL = 'http://localhost:8080/FPP_9/';

export const loginUser = async (username, password) => {
  console.log('Attempting login for username:', username);
  try {
    const formData = new URLSearchParams();
    formData.append('username', username);
    formData.append('password', password);

    console.log('Sending login request to:', `${API_BASE_URL}auth/login`);
    const response = await fetch(`${API_BASE_URL}auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData,
    });
    console.log('Login response:', response);
    console.log('Login response status:', response.status);
    const data = await response.json();
    console.log('Login response data:', data);
    
    if (!response.ok) {
      throw new Error(data.message || 'Login failed');
    }

    localStorage.setItem('user', JSON.stringify(data.user));
    console.log('User data stored in localStorage');
    return data;
  } catch (error) {
    console.error('Login error:', error);
    throw new Error(error.message || 'Login failed');
  }
};

export const registerUser = async (username, password) => {
  console.log('Attempting registration for username:', username);
  try {
    const formData = new URLSearchParams();
    formData.append('username', username);
    formData.append('password', password);

    console.log('Sending registration request to:', `${API_BASE_URL}auth/signup`);
    const response = await fetch(`${API_BASE_URL}auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData,
    });

    console.log('Registration response status:', response.status);
    const data = await response.json();
    console.log('Registration response data:', data);
    
    if (!response.ok) {
      throw new Error(data.message || 'Registration failed');
    }

    localStorage.setItem('user', JSON.stringify(data.user));
    console.log('User data stored in localStorage');
    return data;
  } catch (error) {
    console.error('Registration error:', error);
    throw new Error(error.message || 'Registration failed');
  }
};

export const logout = () => {
  console.log('Logging out user');
  localStorage.removeItem('user');
  console.log('User data removed from localStorage');
};

export const getCurrentUser = () => {
  const user = localStorage.getItem('user');
  console.log('Current user from localStorage:', user);
  return user ? JSON.parse(user)[0] : null;
};

export const getAllUsers = async () => {
  console.log('Fetching all users');
  try {
    const response = await fetch(`${API_BASE_URL}auth/getAllUsers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      }
    });

    console.log('GetAllUsers response status:', response.status);
    const data = await response.json();
    console.log('GetAllUsers response data:', data);
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch user');
    }

    return data;
  } catch (error) {
    console.error('GetAllUsers error:', error);
    throw new Error(error.message || 'Failed to fetch users');
  }
};

export const isCurrentUser = (userId) => {
  const currentUser = getCurrentUser();
  return currentUser ? currentUser.id === userId : false;
};

export const addFriend = async (userId, friendId) => {
  console.log('Attempting to follow user:', friendId, 'for user:', userId);
  try {
    const formData = new URLSearchParams();
    formData.append('user_id', userId);
    formData.append('friend_id', friendId);

    const response = await fetch(`${API_BASE_URL}friend/follow`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData,
    });

    const data = await response.json();
    console.log('Follow response:', data);
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to follow user');
    }

    return data;
  } catch (error) {
    console.error('Follow error:', error);
    throw new Error(error.message || 'Failed to follow user');
  }
};

export const removeFriend = async (userId, friendId) => {
  console.log('Attempting to unfollow user:', friendId, 'for user:', userId);
  try {
    const formData = new URLSearchParams();
    formData.append('user_id', userId);
    formData.append('friend_id', friendId);

    const response = await fetch(`${API_BASE_URL}friend/unfollow`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData,
    });

    const data = await response.json();
    console.log('Unfollow response:', data);
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to unfollow user');
    }

    return data;
  } catch (error) {
    console.error('Unfollow error:', error);
    throw new Error(error.message || 'Failed to unfollow user');
  }
};

export const checkFriendStatus = async (userId, friendId) => {
  console.log('Checking following status for user:', userId, 'and friend:', friendId);
  try {
    const response = await fetch(`${API_BASE_URL}friend?user_id=${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    const data = await response.json();
    console.log('Following status response:', data);
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to check following status');
    }

    // If we're just getting the following list without checking specific user
    if (!friendId) {
      return data;
    }

    // If we're checking for a specific user
    return data.following.some(friend => friend.friend_id === friendId);
  } catch (error) {
    console.error('Check following status error:', error);
    throw new Error(error.message || 'Failed to check following status');
  }
};