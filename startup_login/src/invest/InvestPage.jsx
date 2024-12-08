import React, { useEffect, useState } from 'react';
import { GameEvent, GameNotifier } from './purchaseNotifier'; // Import the custom notifier

const InvestPage = () => {
  const [balance, setBalance] = useState();
  const [error, setError] = useState('');
  const [teams, setTeams] = useState([]);
  const [user, setUser] = useState('');
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch('/api/teams')
        .then((response) => response.json())
        .then((data) => {
            if (Array.isArray(data)) {
                setTeams(data);
            } else {
                setError('Failed to load teams');
            }
        })
        .catch(() => setError('Failed to load teams'));

    fetch('/api/user')
        .then((response) => response.json())
        .then((data) => {
            if (data) {
                setUser(data);
            } else {
                setError('Failed to load user');
            }
            if (data.balance) {
                setBalance(data.balance);
            } else {
                setError('Failed to load user balance');
            }
        })
        .catch(() => setError('Failed to load user balance'));

    // Add the event handler
    GameNotifier.addHandler(handleGameEvent);

    // Cleanup: Remove the event handler when the component unmounts
    return () => {
        GameNotifier.removeHandler(handleGameEvent);
    };
}, []);


  async function handlePurchase(index) {
    const team = teams[index];
    const date = new Date().toLocaleDateString();
    const newPurchase = { name: user.email, teamName: team.name, date: date, price: team.price };

    if (balance >= team.price) {
      await fetch('/api/purchase', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(newPurchase),
      });

      // Update the balance and team shares locally
      setBalance(balance - team.price);
      setTeams((prevTeams) =>
        prevTeams.map((t, i) =>
          i === index ? { ...t, shares: t.shares - 1 } : t
        )
      );

    } else {
      setError('Insufficient balance to make the purchase');
    }
  }

  function handleGameEvent(event) {
    setEvents((prevEvents) => [...prevEvents, event]);
}

  function createMessageArray() {
      const messageArray = [];
      for (const [i, event] of events.entries()) {
          let message = 'unknown';
          if (event.type === GameEvent.End) {
              message = `scored ${event.value.score}`;
          } else if (event.type === GameEvent.Start) {
              message = `started a new game`;
          } else if (event.type === GameEvent.Purchase) {
              message = ` purchased a share of their favorite team`;
          }

          messageArray.push(
              <div key={i} className='event'>
                  <span className={'player-event'}>{event.from.split('@')[0]}</span>
                  {message}
              </div>
          );
      }
      return messageArray;
  }

  async function reset() {
      GameNotifier.broadcastEvent(user.email, GameEvent.Purchase, {});
  }

  return (
    <div className="container mt-5 d-flex">
      {/* Sidebar for messages */}
      <div className="sidebar bg-light p-3"
                style={{ color: 'black', width: '20%', borderRight: '1px solid #ddd', height: '100vh', overflowY: 'auto', marginRight: '30px' }}>
                <h5>Activity Log</h5>
                <div id='player-messages'>{createMessageArray()}</div>
      </div>

      {/* Main content */}
      <div className="content-container" style={{ width: '80%' }}>
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
                    onClick={() => {
                      handlePurchase(index);
                      reset(index);
                    }}
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
    </div>
  );
};

export default InvestPage;
