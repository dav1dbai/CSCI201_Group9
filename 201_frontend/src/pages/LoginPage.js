
import React, { useState } from 'react';
import '../styles/LoginPage.css';
import { useNavigate } from 'react-router-dom'

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault()
    navigate('/home')
  }

  return (
    <div className="login-auth-page">
      <div className="login-content-container">
        <h1 className="login-title">Rankify</h1>
        <div className="login-powered-by">
          powered by <span className="login-spotify-text">Spotify</span>
        </div>

        <div className="login-form-container">
          <h2>Sign in</h2>

            <form onSubmit={handleSubmit}>
              <div className="login-input-group">
                <label>Username</label>
                <input type=" text" />
              </div>

              <div className="login-input-group">
                <label>Password</label>
                <div className="login-password-field">
                  <input type={showPassword ? "text" : "password"} />
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

              <div className="login-forgot-password">
                <a href="/forgot-password">Forgot Password?</a>
              </div>
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