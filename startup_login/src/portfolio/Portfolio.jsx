import React from 'react';

const Portfolio = () => {
  // Example portfolio data
  const portfolio = [
    { name: 'BYU Football', price: 35, shares: 4 },
    { name: 'Suns', price: 57, shares: 3 },
    { name: 'Dodgers', price: 73, shares: 5 },
  ];

  // Calculate total portfolio value
  const totalValue = portfolio.reduce((sum, team) => sum + team.price * team.shares, 0);

  return (
    <div>
      <main className="container bg-secondary text-center my-5 p-4 rounded text-white">
        <section>
          <h2>Your Portfolio</h2>
          <table className="table table-dark table-striped mt-4">
            <thead>
              <tr>
                <th>Team</th>
                <th>Price Per Share</th>
                <th>Shares Owned</th>
                <th>Total Value</th>
              </tr>
            </thead>
            <tbody>
              {portfolio.map((team, index) => (
                <tr key={index}>
                  <td>{team.name}</td>
                  <td>${team.price}</td>
                  <td>{team.shares}</td>
                  <td>${team.price * team.shares}</td>
                </tr>
              ))}
              <tr>
                <td colSpan="3" className="text-end fw-bold">Total Portfolio Value:</td>
                <td className="fw-bold">${totalValue}</td>
              </tr>
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
};

export default Portfolio;