import React, { useEffect, useState } from 'react';

const Portfolio = () => {
  const [portfolio, setPortfolio] = useState([]);
  const [totalValue, setTotalValue] = useState(0);

  useEffect(() => {
    const fetchPortfolio = async () => {
      const response = await fetch('/api/portfolio');
      const data = await response.json();
      console.log(data);
      setPortfolio(data);

      let total = 0;
      data.forEach((team) => {
        total += team.price * team.shares;
      });
      setTotalValue(total);
    };

    fetchPortfolio();
  }, []);

  const sellShare = async (index) => {
    const team = portfolio[index];
    const newSellBack = { teamName: team.teamName, price: team.price };

    await fetch('/api/sell', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(newSellBack),
    });

    // Update the portfolio locally
    setPortfolio((prevPortfolio) =>
      prevPortfolio.map((t, i) =>
        i === index ? { ...t, shares: t.shares - 1 } : t
      )
      // Filter out teams with 0 shares
      .filter((t) => t.shares > 0)
    );
  }

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
                  <td>{team.teamName}</td>
                  <td>${team.price}</td>
                  <td>{team.shares}</td>
                  <td>${team.price * team.shares}</td>
                  <td>
                    <button onClick={() => sellShare(index)} disabled={team.shares === 0}>
                      Sell
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
};

export default Portfolio;