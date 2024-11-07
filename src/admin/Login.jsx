import React, { useState } from 'react';
import './Login.css';
import { auth, createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, googleProvider, facebookProvider } from './firebase'; // Firebase functions
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSignUp, setIsSignUp] = useState(false); // Track whether it's Sign Up or Login
  const navigate = useNavigate();

  // Handle email/password login
  const handleEmailLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('User logged in:', user);
        navigate('/');
      })
      .catch((error) => {
        setError(error.message);
        console.error('Error during login:', error.message);
      });
  };

  // Handle email/password sign up
  const handleEmailSignUp = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('User signed up:', user);
        navigate('/'); // Redirect after successful sign up
      })
      .catch((error) => {
        setError(error.message);
        console.error('Error during sign up:', error.message);
      });
  };

  // Handle Forgot Password
  const handleForgotPassword = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert('Password reset email sent!');
      })
      .catch((error) => {
        setError(error.message);
        console.error('Error sending password reset email:', error.message);
      });
  };

  // Handle Google login
  const handleGoogleLogin = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;
        console.log('Google login successful:', user);
        navigate('/');
      })
      .catch((error) => {
        setError(error.message);
        console.error('Error during Google login:', error.message);
      });
  };

  // Handle Facebook login
  const handleFacebookLogin = () => {
    signInWithPopup(auth, facebookProvider)
      .then((result) => {
        const user = result.user;
        console.log('Facebook login successful:', user);
        navigate('/');
      })
      .catch((error) => {
        setError(error.message);
        console.error('Error during Facebook login:', error.message);
      });
  };

  return (
        <div className="login-container">
          <div className="container">
            <div className="form-box">
              <h2 className="header-form">{isSignUp ? 'Sign Up' : 'Login'}</h2>
              <form onSubmit={isSignUp ? handleEmailSignUp : handleEmailLogin}>
                <div>
                  <label>Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit">{isSignUp ? 'Sign Up' : 'Login'}</button>
          </form>

          <div className="auth-buttons">
            <button onClick={handleGoogleLogin} style={{ backgroundColor: '#4285F4', color: 'white' }}>
              Login with Google
            </button>
            <button onClick={handleFacebookLogin} style={{ backgroundColor: '#3b5998', color: 'white' }}>
              Login with Facebook
            </button>
          </div>

          <div className="message">
            {isSignUp ? (
              <>
                <span>Already have an account? </span>
                <span onClick={() => setIsSignUp(false)} style={{ cursor: 'pointer' }}>Login</span>
              </>
            ) : (
              <>
                <span onClick={handleForgotPassword} style={{ cursor: 'pointer' }}>Forgot Password?</span>
                <span> | </span>
                <span onClick={() => setIsSignUp(true)} style={{ cursor: 'pointer' }}>Sign Up</span>
              </>
            )}
          </div>

          {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
      </div>
    </div>
  
    
  );
};

export default Login;
