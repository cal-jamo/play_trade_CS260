import React from 'react';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

export function Authenticated(props) {
    const navigate = useNavigate();

    function logout() {
        fetch(`/api/auth/logout`, {
            method: 'delete',
        })
        .catch(() => {
            // Logout failed. Assuming offline
        })
        .finally(() => {
            localStorage.removeItem('userName');
            props.onLogout();
        });
    }


    return (
        <div>
            <div className='text-dark mb-2'>{props.userName}</div>
            <Button variant='primary' onClick={() => navigate('/invest')}>
                Invest
            </Button>
            <Button variant='secondary' onClick={() => logoutUser()}>
                Logout
            </Button>
        </div>
    );
}