import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Signup.css'; // Import your CSS file
import { createAuthUserWithEmailAndPassword } from '../firebase';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

function SignUp() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isExistingAccount, setIsExistingAccount] = useState(false);
  const [newUserUID, setNewUserUID] = useState(null); // Store the new user's UID

  const isFormValid = firstName && lastName && email && password && confirmPassword;

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setIsExistingAccount(false);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const checkExistingAccount = async () => {
    const auth = getAuth();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setIsExistingAccount(true);
    } catch (error) {
      setIsExistingAccount(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    await checkExistingAccount();

    if (isExistingAccount) {
      setError('An account with this email already exists. Please log in.');
    } else {
      try {
        const auth = getAuth();
        const userCredential = await createAuthUserWithEmailAndPassword(email, password);
        const newUser = userCredential.user;
        setNewUserUID(newUser.uid); // Store the UID of the newly created user

        console.log('Successfully registered with UID:', newUser.uid);
      } catch (createUserError) {
        setError('Error registering: ' + createUserError.message);
      }
    }
  };

  // Redirect to login page when a new user is created
  if (newUserUID) {
    return (
      <div className="signup-container">
        <div className="signup-form">
          <p>Your account has been created. You can now <Link to="/login">log in</Link>.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="signup-container">
      <div className="signup-form">
        <h2>Create an Account</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>First Name:</label>
            <input
              type="text"
              value={firstName}
              onChange={handleFirstNameChange}
              placeholder="Enter your first name"
              required
            />
          </div>
          <div className="form-group">
            <label>Last Name:</label>
            <input
              type="text"
              value={lastName}
              onChange={handleLastNameChange}
              placeholder="Enter your last name"
              required
            />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="form-group">
            <label>Confirm Password:</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              placeholder="Confirm your password"
              required
            />
          </div>
          <button
            type="submit"
            disabled={!isFormValid || isExistingAccount}
          >
            Create Account
          </button>
        </form>
      </div>
      <p>Already have an account? <Link to="/login">Login here</Link></p>
    </div>
  );
}

export default SignUp;
