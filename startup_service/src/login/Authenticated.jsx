import React from 'react';
import { useNavigate } from 'react-router-dom';

import Button from 'react-bootstrap/Button';

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
        <Button variant='secondary' onClick={() => logout()}>
            Logout
        </Button>
        </div>
    );
}
