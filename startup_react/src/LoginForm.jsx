import React from 'react';
import { useNavigate } from 'react-router-dom';

const LoginForm = ({ handleSubmit, username, setUsername, password, setPassword }) => {
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(e);
    navigate('/home'); // Navigate to HomePage after form submission
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="form-group mb-4">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          className="form-control"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="form-group mb-4">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          className="form-control"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit" className="btn btn-primary">Login</button>
    </form>
  );
};

export default LoginForm;