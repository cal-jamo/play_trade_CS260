import React from 'react';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

export function Authenticated(props) {
    const navigate = useNavigate();

    async function logout() {
        const response = await fetch('/api/auth/logout', {
            method: 'delete',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
        if (response?.status === 200) {
            localStorage.removeItem('userName');
            props.onLogout();
        } else {
            console.error('Logout failed');
        }
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