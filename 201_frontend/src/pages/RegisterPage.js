import React, { useState } from 'react';
import '../styles/RegisterPage.css';
import { useNavigate } from 'react-router-dom'
import { registerUser } from '../utils/auth'

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const USERNAME_REGEX = /^[a-zA-Z0-9_]{3,20}$/;
  const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!EMAIL_REGEX.test(email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    if (!USERNAME_REGEX.test(username)) {
      setError('Username must be 3-20 characters long and can only contain letters, numbers, and underscores');
      return;
    }
    
    if (!PASSWORD_REGEX.test(password)) {
      setError('Password must meet all requirements');
      return;
    }

    try {
      await registerUser(username, password);
      navigate('/home');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="register-auth-page">
      <div className="register-header">
        <div className="login-text">Already have an account? <a href="/">Log in</a></div>
      </div>
      
      <div className="register-content-container">
        <div class="flex justify-center p-4">
          <img
            src="/images/logo.svg"
            width={250} height={100}
            alt="Rankify"
          />
        </div>
        <div className="register-form-container">
          <h2>Create an account</h2>
          <p className="info-text">*Potentially add some information here*</p>

          <form onSubmit={handleSubmit}>
            
            <div className="register-input-group">
              <label>Email</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="register-input-group">
              <label>Username</label>
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <p className="register-hint-text">Username must be unique</p>
            </div>

            <div className="register-input-group">
              <label>Password</label>
              <div className="register-password-field">
                <input 
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button 
                    type="button" 
                    className="register-hide-button"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
              </div>
              <div className="register-password-requirements">
                <p>• Use 8 or more characters</p>
                <p>• Use upper and lower case letters</p>
                <p>• Use a number (e.g. 1234)</p>
                <p>• Use a symbol (e.g. !@#$)</p>
              </div>
            </div>

            {error && <div className="error-message">{error}</div>}

            <button type="submit" className="register-create-account-btn">Create Account</button>
            
            <p className="register-terms-text">
              By creating an account, you agree to the{' '}
              <a href="/terms">Terms of use</a> and{' '}
              <a href="/terms">Privacy Policy</a>.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;