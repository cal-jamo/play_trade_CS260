import React from 'react';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

export function Authenticated(props) {
    const navigate = useNavigate();

    // Logout handler
    function logoutUser() {
        fetch(`/api/auth/logout`, {
            method: 'DELETE', // Ensure this is using the correct HTTP method
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Logout failed');
            }
        })
        .catch((error) => {
            console.error('Logout error:', error);
            // Optional: show a user-friendly message if the logout fails
        })
        .finally(() => {
            localStorage.removeItem('userName');
            props.onLogout(); // Notify the parent component about logout
        });
    }

    return (
        <div>
            <div className="text-dark mb-2">{props.userName}</div>
            <Button variant="primary" onClick={() => navigate('/invest')}>
                Invest
            </Button>
            <Button variant="secondary" onClick={logoutUser}>
                Logout
            </Button>
        </div>
    );
}
