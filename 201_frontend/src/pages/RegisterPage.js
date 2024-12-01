
import React, { useState } from 'react';
import '../styles/RegisterPage.css';
import { useNavigate } from 'react-router-dom'

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault()
    navigate('/home')
  }

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
              <a href="/terms">Privacy Policy</a>.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;