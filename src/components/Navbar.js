import React from 'react';
import {Link} from 'react-router-dom';
import logo from '../images/logo-white.svg';

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
                    <Link to="/leaderboard">
                        Leaderboard
                    </Link>
                </li>
                <li>
                    <Link to="/scoreboard">
                        Create/Edit
                    </Link>
                </li>
            </ul>
        </nav>
    )
}
