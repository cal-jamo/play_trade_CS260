import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LoginForm from './LoginForm'; // Import LoginForm component
import InvestPage from './InvestPage'; // Import InvestPage component
import HomePage from './HomePage';
import Portfolio from './Portfolio';
import SportsNews from './SportsNews';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Username:', username);
    console.log('Password:', password);
  };

  return (
    <Router>
      <div className="bg-dark text-light vh-100 d-flex flex-column">
        <header className="container-fluid">
          <nav className="navbar navbar-dark">
            <a className="navbar-brand" href="#">Play Trade</a>
            <div className="navbar-nav d-flex flex-row">
              <Link className="nav-link mx-2" to="/invest">Invest</Link>
              <Link className="nav-link mx-2" to="/sportsNews">Sports News</Link>
              <Link className="nav-link mx-2" to="/home">Home</Link>
              <Link className="nav-link mx-2" to="/portfolio">Portfolio</Link>
            </div>
          </nav>
        </header>

        <main className="container-fluid bg-secondary text-center flex-grow-1 d-flex flex-column justify-content-center align-items-center m-0 p-0">
          <Routes>
            <Route path="/" element={<LoginForm handleSubmit={handleSubmit} username={username} setUsername={setUsername} password={password} setPassword={setPassword} />} />
            <Route path="/invest" element={<InvestPage />} />
            <Route path="/sportsNews" element={<SportsNews />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/portfolio" element={<Portfolio />} />
          </Routes>
        </main>

        <footer className="bg-dark text-white-50 text-center py-3 m-0 p-0">
          <p>Created by Calvin Jameson</p>
          <p><a className="text-reset" href="https://github.com/cal-jamo/play_trade_CS260.git">GitHub Repository</a></p>
        </footer>
      </div>
    </Router>
  );
}

export default App;