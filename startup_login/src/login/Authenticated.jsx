import React from 'react';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

export function Authenticated(props) {
    const navigate = useNavigate();

    async function logoutUser() {
        try {
            const response = await fetch('/api/auth/logout', {
                method: 'DELETE',
                credentials: 'include', // To send the cookie
            });
    
            if (response.status === 204) {
                localStorage.removeItem('userName'); // Optionally clear local storage
                props.onLogout(); // Trigger any parent component state updates (like showing the login form again)
            } else {
                setDisplayError('⚠ Error: Unable to log out');
            }
        } catch (error) {
            setDisplayError(`⚠ Error: ${error.message}`);
        }
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