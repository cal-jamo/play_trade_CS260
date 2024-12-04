import React from 'react';
import Button from 'react-bootstrap/Button';
import { MessageDialog } from './messageDialog';

export function Unauthenticated(props) {
    const [userName, setUserName] = React.useState(props.userName);
    const [password, setPassword] = React.useState('');
    const [displayError, setDisplayError] = React.useState(null);

    async function loginUser() {
        await loginOrCreate(`/api/auth/login`); // Use the proxy path
    }

    async function createUser() {
        await loginOrCreate(`/api/auth/create`); // Use the proxy path
    }

    async function loginOrCreate(endpoint) {
        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                body: JSON.stringify({ email: userName, password: password }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            });

            if (response.ok) { // If response is successful (status 200-299)
                const contentType = response.headers.get('content-type');
                if (contentType && contentType.indexOf('application/json') !== -1) {
                    const body = await response.json();
                    localStorage.setItem('userName', userName);
                    props.onLogin(userName); // Notify parent of successful login
                    setUserName(''); // Clear input fields
                    setPassword('');
                    setDisplayError(null); // Clear any previous error
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
                <div className="input-group mb-3">
                    <span className="input-group-text">Username</span>
                    <input
                        className="form-control"
                        type="text"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        placeholder="username"
                    />
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text">🔒</span>
                    <input
                        className="form-control"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="password"
                    />
                </div>
                <Button variant="primary" onClick={loginUser} disabled={!userName || !password}>
                    Login
                </Button>
                <Button variant="secondary" onClick={createUser} disabled={!userName || !password}>
                    Create
                </Button>
            </div>

            {/* Display error message if present */}
            <MessageDialog message={displayError} onHide={() => setDisplayError(null)} />
        </>
    );
}
