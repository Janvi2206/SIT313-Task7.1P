import React, { useState } from 'react';
import './Login.css'; // Import your CSS file
import { Link } from 'react-router-dom';
import { signinAuthUserWithEmailAndPassword } from '../firebase';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState(null);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await signinAuthUserWithEmailAndPassword(email, password);
      const user = userCredential.user;

      if (user) {
        console.log('Successfully logged in with UID:', user.uid);
        setLoggedIn(true); // Set the loggedIn state to true
      } else {
        setError('User does not exist');
      }
    } catch (error) {
      setError('Incorrect password or other login error.');
      console.error('Error logging in:', error);
    }
  };

  return (
    <div className="login-container">
      {loggedIn ? ( // Render header content when loggedIn state is true
        <div>
          <p>You are logged in. Open the <Link to="/">Home page</Link>.</p>
        </div>
      ) : (
        <div>
          {error && <div className="error-message">{error}</div>}
          <div>
            <Link to="/Signup">
              <button className="sign-up-button">Sign Up</button>
            </Link>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Your Email:</label>
              <input
                type="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="form-group">
              <label>Your Password:</label>
              <input
                type="password"
                value={password}
                onChange={handlePasswordChange}
                placeholder="Enter your password"
                required
              />
            </div>
            <button type="submit">Login</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Login;
