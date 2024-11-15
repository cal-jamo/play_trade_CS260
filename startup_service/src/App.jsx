import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login } from './login/Login';
import InvestPage from './invest/InvestPage';
import SportsNews from './sports_news/SportsNews';
import HomePage from './home/HomePage';
import Portfolio from './portfolio/Portfolio';
import { AuthState } from './login/authState';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink } from 'react-router-dom';

function App() {
  const [userName, setUserName] = React.useState(localStorage.getItem('userName') || '');
  const currentAuthState = userName ? AuthState.Authenticated : AuthState.Unauthenticated;
  const [authState, setAuthState] = React.useState(currentAuthState);

  return (
    <BrowserRouter>
      <div className="bg-dark text-light vh-100 d-flex flex-column">
        <header className='container-fluid'>
          <nav className="navbar navbar-dark">
            <div className='navbar-brand'>
              Play Trade
            </div>
            <div className="navbar-nav d-flex flex-row">
                <NavLink className='nav-link mx-2' to=''>
                  Login
                </NavLink>
              {authState === AuthState.Authenticated && (
                  <NavLink className='nav-link mx-2' to='sportsNews'>
                    Sports News
                  </NavLink>
              )}
              {authState === AuthState.Authenticated && (
                  <NavLink className='nav-link mx-2' to='invest'>
                    Invest
                  </NavLink>
              )}
              {authState === AuthState.Authenticated && (
                  <NavLink className='nav-link mx-2' to='portfolio'>
                    Portfolio
                  </NavLink>
              )}
                <NavLink className='nav-link mx-2' to='home'>
                  Home
                </NavLink>
            </div>
          </nav>
        </header>

        <main className="container-fluid bg-secondary text-center flex-grow-1 d-flex flex-column justify-content-center align-items-center m-0 p-0">
          <Routes>
            <Route
              path='/'
              element={
                <Login
                  userName={userName}
                  authState={authState}
                  onAuthChange={(userName, authState) => {
                    setAuthState(authState);
                    setUserName(userName);
                  }}
                />
              }
              exact
            />
            <Route path="/invest" element={<InvestPage />} />
            <Route path="/sportsNews" element={<SportsNews />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/portfolio" element={<Portfolio />} />
          </Routes>
        </main>
        <footer className="bg-dark text-white-50 text-center py-3 m-0 p-0">
          <p>Created by Calvin Jameson</p>
          <p><a className="text-reset" href="https://github.com/cal-jamo/play_trade_CS260.git">GitHub Repository</a></p>
        </footer>
      </div>
    </BrowserRouter>
  );
}

function NotFound() {
  return <main className='container-fluid bg-secondary text-center'>404: Return to sender. Address unknown.</main>;
}

export default App;
