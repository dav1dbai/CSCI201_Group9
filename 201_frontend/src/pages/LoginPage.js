import React, { useState } from 'react';
import '../styles/LoginPage.css';
import { useNavigate } from 'react-router-dom'
import { loginUser } from '../utils/auth';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await loginUser(username, password);
      navigate('/home');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="login-auth-page">
      <div className="login-content-container">
        <div class="flex justify-center pt-2">
          <img
            src="/images/logo.svg"
            width={250} height={100}
            alt="Rankify"
          />
        </div>
        <div className="login-form-container">
          <h2>Sign in</h2>

            <form onSubmit={handleSubmit}>
              <div className="login-input-group">
                <label>Username</label>
                <input 
                  type="text" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div className="login-input-group">
                <label>Password</label>
                <div className="login-password-field">
                  <input 
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button 
                    type="button" 
                    className="login-hide-button"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              <button type="submit" className="login-submit-button">
                Sign in
              </button>

            </form>

            <div className="login-signup-link">
              Don't have an account? <a href="/signup">Sign up</a>
            </div>

        </div>

      </div>
    </div>
  );
};

export default LoginPage;