import React, { useState } from 'react';

export default function Login({ onLogin }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    // THIS IS THE MAGIC LINE: It stops the page from refreshing
    e.preventDefault(); 
    
    // Check the password
    if (password === 'admin123') {
      onLogin(); // Tell App.jsx to unlock the dashboard
    } else {
      setError('Incorrect password. Try "admin123"');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>🍕 RestaurantOS</h1>
        <p>Admin Portal</p>
        
        {/* Notice we are using onSubmit here */}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
            />
          </div>
          
          {error && <p className="error-text">{error}</p>}
          
          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '10px' }}>
            Login to Dashboard
          </button>
        </form>
      </div>
    </div>
  );
}