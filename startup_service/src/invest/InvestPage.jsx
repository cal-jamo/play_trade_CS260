import React, { useState, useEffect } from 'react';

const InvestPage = () => {
  const [balance, setBalance] = useState(0);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // Check if there's a token in localStorage
    const token = localStorage.getItem('token');
    
    if (token) {
      // Fetch user data (e.g., balance) using the stored token
      fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),  // Send token for authentication
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.token) {
            // Successfully authenticated, store the new token and set balance
            localStorage.setItem('token', data.token);  // Store the new token (if updated)
            setBalance(data.balance);  // Set the balance from the server
          } else {
            setError('Failed to authenticate');
          }
        })
        .catch((err) => {
          setError('Failed to authenticate');
          console.error(err);
        });
    } else {
      setError('No token found, please log in');
    }
  }, []);
  

  const handlePurchase = (amount) => {
    const token = localStorage.getItem('token'); // Retrieve the token from localStorage
  
    if (!token) {
      alert('Please log in to make a purchase');
      return;
    }
  
    if (balance >= amount) {
      fetch('http://localhost:3000/api/purchase', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Send token in Authorization header
        },
        body: JSON.stringify({ amount }),  // Send purchase data
      })
        .then(res => {
          if (!res.ok) {
            throw new Error('Purchase failed');
          }
          return res.json();
        })
        .then(data => {
          setBalance(data.balance);  // Update balance after purchase
        })
        .catch((err) => {
          setError('Purchase failed');
          console.error(err);
        });
    } else {
      alert('Not enough balance!');
    }
  };

  return (
    <div>
      <h1>Current Balance: {balance}</h1>
      <button onClick={() => handlePurchase(100)}>Buy Athlete for 100</button>
      <div>{error}</div>
    </div>
  );
};

export default InvestPage;
