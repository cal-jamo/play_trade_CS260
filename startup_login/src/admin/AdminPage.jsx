import React, { useEffect, useState } from 'react';

const AdminPage = () => {
    const [teams, setTeams] = useState([]);
    const [error, setError] = useState('');
    const [balance, setBalance] = useState(0); // Assuming balance state is also used in AdminPage

    const [newTeam, setNewTeam] = useState({ name: '', price: 0, shares: 0, sport: '' });

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
    }, []);

    const handleInputChange = (index, field, value) => {
        setTeams((prevTeams) =>
        prevTeams.map((team, i) =>
            i === index ? { ...team, [field]: value } : team
        )
        );
    };

    const handleUpdateTeam = async (index) => {
        const team = teams[index];
        const { name, price, shares } = team;
        try {
        const response = await fetch('/api/team/update', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, price, shares }), // Send name, price, and shares
        });
        const data = await response.json();
        if (response.ok) {
            alert(data.msg || 'Team updated successfully!');
        } else {
            setError(data.msg || 'Failed to update team');
        }
        } catch (error) {
        console.error(error);
        setError('Failed to update team');
        }
    };

    const handleAddTeam = async () => {
        try {
        const response = await fetch('/api/team/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newTeam), // Send new team details
        });
        const data = await response.json();
        if (response.ok) {
            setTeams((prevTeams) => [...prevTeams, newTeam]); // Add the new team to the list
            alert(data.msg || 'Team added successfully!');
            setNewTeam({ name: '', price: 0, shares: 0, sport: '' }); // Reset the form
        } else {
            setError(data.msg || 'Failed to add team');
        }
        } catch (error) {
        console.error(error);
        setError('Failed to add team');
        }
    };

    const handleNewTeamInputChange = (field, value) => {
        setNewTeam((prev) => ({ ...prev, [field]: value }));
    };

    return (
        <div className="container mt-5">
        <h1 className="text-center mb-4">Admin Panel: Manage Teams</h1>
        {error && <div className="alert alert-danger text-center">{error}</div>}

        {/* Add Team Form */}
        <div className="form-container mb-4">
            <h2>Add New Team</h2>
            <div className="form-group">
                <label>Team Name:</label>
                <input
                    type="text"
                    className="form-control"
                    value={newTeam.name}
                    onChange={(e) => handleNewTeamInputChange('name', e.target.value)}
                />
            </div>
            <div className="form-group">
                <label>Sport:</label>
                <input
                    type="text"
                    className="form-control"
                    value={newTeam.sport}
                    onChange={(e) => handleNewTeamInputChange('sport', e.target.value)}
                />
            </div>
            <div className="form-group mt-2">
                <label>Price:</label>
                <input
                    type="number"
                    className="form-control"
                    value={newTeam.price}
                    onChange={(e) => handleNewTeamInputChange('price', parseFloat(e.target.value))}
                />
            </div>
            <div className="form-group mt-2">
                <label>Shares:</label>
                <input
                    type="number"
                    className="form-control"
                    value={newTeam.shares}
                    onChange={(e) => handleNewTeamInputChange('shares', parseInt(e.target.value, 10))}
                />
            </div>
            <button
                onClick={handleAddTeam}
                className="btn btn-success mt-3"
            >
                Add Team
            </button>
        </div>

        <div className="row">
            {teams.map((team, index) => (
            <div key={index} className="col-md-4 col-lg-3 mb-4">
                <div className="card h-100">
                <div className="card-body text-center">
                    <h5 className="card-title">{team.name}</h5>
                    <p className="card-text">Sport: {team.sport}</p>
                    <div className="form-group">
                    <label>Price:</label>
                    <input
                        type="number"
                        className="form-control"
                        value={team.price}
                        onChange={(e) =>
                        handleInputChange(index, 'price', parseFloat(e.target.value))
                        }
                    />
                    </div>
                    <div className="form-group mt-2">
                    <label>Shares:</label>
                    <input
                        type="number"
                        className="form-control"
                        value={team.shares}
                        onChange={(e) =>
                        handleInputChange(index, 'shares', parseInt(e.target.value, 10))
                        }
                    />
                    </div>
                    <button
                    onClick={() => handleUpdateTeam(index)}
                    className="btn btn-primary mt-3"
                    >
                    Update
                    </button>
                </div>
                </div>
            </div>
            ))}
        </div>
        </div>
    );
};

export default AdminPage;
