import React, { useState } from 'react';

const InvestPage = () => {
  const [balance, setBalance] = useState(2000); // Start with $2000
  const [error, setError] = useState('');

  const [teams, setTeams] = useState([
    { name: 'BYU Football', price: 35, sport: 'Football', shares: 4 },
    { name: 'Suns', price: 57, sport: 'Basketball', shares: 3 },
    { name: 'Dodgers', price: 73, sport: 'Baseball', shares: 5 },
    { name: 'Chiefs', price: 61, sport: 'Football', shares: 2 },
    { name: 'Lakers', price: 80, sport: 'Basketball', shares: 1 },
    { name: 'Patriots', price: 44, sport: 'Football', shares: 5 },
    { name: 'Mavericks', price: 92, sport: 'Basketball', shares: 4 },
    { name: 'Jets', price: 26, sport: 'Football', shares: 1 },
    { name: 'Jazz', price: 95, sport: 'Basketball', shares: 3 },
    { name: 'Warriors', price: 67, sport: 'Basketball', shares: 5 },
    { name: 'Rams', price: 53, sport: 'Football', shares: 2 },
    { name: 'Yankees', price: 84, sport: 'Baseball', shares: 4 },
    { name: 'Giants', price: 38, sport: 'Football', shares: 3 },
    { name: 'Red Sox', price: 77, sport: 'Baseball', shares: 2 },
    { name: 'Celtics', price: 88, sport: 'Basketball', shares: 1 },
    { name: 'Cubs', price: 49, sport: 'Baseball', shares: 5 },
    { name: 'Packers', price: 59, sport: 'Football', shares: 4 },
    { name: 'Brewers', price: 32, sport: 'Baseball', shares: 3 },
    { name: 'Bills', price: 47, sport: 'Football', shares: 2 },
    { name: 'Astros', price: 71, sport: 'Baseball', shares: 1 },
  ]);

  const handlePurchase = (index) => {
    const team = teams[index];

    if (balance >= team.price && team.shares > 0) {
      setBalance(balance - team.price); // Subtract price from balance

      // Update the team's shares in the state
      setTeams((prevTeams) =>
        prevTeams.map((t, i) =>
          i === index ? { ...t, shares: t.shares - 1 } : t
        )
      );

      setError('');
    } else if (team.shares === 0) {
      setError('No shares available for this team!');
    } else {
      setError('Not enough balance!');
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Current Balance: ${balance}</h1>
      {error && <div className="alert alert-danger text-center">{error}</div>}

      <div className="row">
        {teams.map((team, index) => (
          <div key={index} className="col-md-4 col-lg-3 mb-4">
            <div className="card h-100">
              <div className="card-body text-center">
                <h5 className="card-title">{team.name}</h5>
                <p className="card-text">Sport: {team.sport}</p>
                <p className="card-text">Price: ${team.price}</p>
                <p className="card-text">Shares: {team.shares}</p>
                <button
                  onClick={() => handlePurchase(index)}
                  className="btn btn-success mt-3"
                  disabled={team.shares === 0} // Disable button if no shares are left
                >
                  Buy
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InvestPage;
