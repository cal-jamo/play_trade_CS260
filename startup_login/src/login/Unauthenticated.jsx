import React from 'react';
import Button from 'react-bootstrap/Button';
import { MessageDialog } from './messageDialog';

export function Unauthenticated(props) {
    const [userName, setUserName] = React.useState(props.userName);
    const [password, setPassword] = React.useState('');
    const [displayError, setDisplayError] = React.useState(null);

    async function loginUser() {
        loginOrCreate(`/api/auth/login`); // Use the proxy path
    }

    async function createUser() {
        loginOrCreate(`/api/auth/create`); // Use the proxy path
    }

    async function loginOrCreate(endpoint) {
        try {
            const response = await fetch(endpoint, {
                method: 'post',
                body: JSON.stringify({ email: userName, password: password }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            });

            if (response?.status === 200) {
                const contentType = response.headers.get('content-type');
                if (contentType && contentType.indexOf('application/json') !== -1) {
                    const body = await response.json();
                    localStorage.setItem('userName', userName);
                    props.onLogin(userName);
                } else {
                    setDisplayError('⚠ Error: Received non-JSON response');
                }
            } else {
                const body = await response.json();
                setDisplayError(`⚠ Error: ${body.msg}`);
            }
        } catch (error) {
            setDisplayError(`⚠ Error: ${error.message}`);
        }
    }

    
    return (
        <>
            <div>
                <div className='input-group mb-3'>
                    <span className='input-group-text'>Username</span>
                    <input
                        className='form-control'
                        type='text'
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        placeholder='username'
                    />
                </div>
                <div className='input-group mb-3'>
                    <span className='input-group-text'>🔒</span>
                    <input
                        className='form-control'
                        type='password'
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder='password'
                    />
                </div>
                <Button variant='primary' onClick={loginUser} disabled={!userName || !password}>
                    Login
                </Button>
                <Button variant='secondary' onClick={createUser} disabled={!userName || !password}>
                    Create
                </Button>
            </div>

            <MessageDialog message={displayError} onHide={() => setDisplayError(null)} />
        </>
    );
}

