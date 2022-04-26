import React from 'react';
import {Link} from 'react-router-dom';
import logo from '../images/logo-white.svg';
import netlifyIdentity from 'netlify-identity-widget';

import '../css/navbar.css';

export default function Navbar() {
    return (
        <nav className="container">
            <ul className="home-nav-link">
                <li>
                    <Link to="/">
                        <img src={logo} height={50} width={100} alt="white FPR logo" />
                    </Link>
                </li>
            </ul>
            <ul className="nav-links">
                <li>
                    <a className="login-a" onClick={() => netlifyIdentity.open()}>Login/Sign Up</a>
                </li>
                <li>
                    <Link to="/leaderboard">
                        Leaderboard
                    </Link>
                </li>
                <li>
                    <Link to="/scoreboard">
                        Admin
                    </Link>
                </li>
            </ul>
        </nav>
    )
}
