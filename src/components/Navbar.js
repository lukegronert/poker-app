import React from 'react';
import {Link} from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import logo from '../images/logo-white.svg';
import netlifyIdentity from 'netlify-identity-widget';
import MenuDropdown from './MenuDropdown';

import '../css/navbar.css';

export default function Navbar() {
    const isMobile = useMediaQuery({ query: `(max-width: 760px)` });
    if(!isMobile) {
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
                        <a className="login-a" onClick={() => netlifyIdentity.open()}>Login</a>
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
    } else {
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
                    <li style={{margin: 0}}>
                        <MenuDropdown />
                    </li>
                </ul>
            </nav>
        )
    }
}
