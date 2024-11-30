
import React, { useState } from 'react';
import '../styles/RegisterPage.css';

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="register-auth-page">
      <div className="register-header">
        <div className="login-text">Already have an account? <a href="/login">Log in</a></div>
      </div>
      
      <div className="register-content-container">
        <h1 className="register-title">Rankify</h1>
        <div className="register-powered-by">
          powered by <span className="register-spotify-text">Spotify</span>
        </div>

        <div className="register-form-container">
          <h2>Create an account</h2>
          <p className="info-text">*Potentially add some information here*</p>

          <form>
            <div className="register-input-group">
              <label>Email</label>
              <input type="email" placeholder="" />
            </div>

            <div className="register-input-group">
              <label>Username</label>
              <input type="text" placeholder="" />
              <p className="register-hint-text">*Insert any rules we have for usernames*</p>
            </div>

            <div className="register-input-group">
              <label>Password</label>
              <div className="register-password-field">
                <input type={showPassword ? "text" : "password"} />
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

            <button type="submit" className="register-create-account-btn">Create Account</button>
            
            <p className="register-terms-text">
              By creating an account, you agree to the{' '}
              <a href="/terms">Terms of use</a> and{' '}
              <a href="/privacy">Privacy Policy</a>.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;