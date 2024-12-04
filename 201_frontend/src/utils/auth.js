const API_BASE_URL = 'http://localhost:8080/FPP_9/auth';

export const loginUser = async (username, password) => {
  console.log('Attempting login for username:', username);
  try {
    const formData = new URLSearchParams();
    formData.append('username', username);
    formData.append('password', password);

    console.log('Sending login request to:', `${API_BASE_URL}/login`);
    const response = await fetch(`${API_BASE_URL}/login`, {
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

    console.log('Sending registration request to:', `${API_BASE_URL}/signup`);
    const response = await fetch(`${API_BASE_URL}/signup`, {
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
