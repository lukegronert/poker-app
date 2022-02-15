import React from 'react';
import {Link} from 'react-router-dom';
import { IconContext } from 'react-icons';
import { RiAdminFill } from 'react-icons/ri';
import { AiFillHome } from 'react-icons/ai';

import '../css/navbar.css';

export default function Navbar() {
    return (
        <nav className="container">
            <ul>
                <li>
                    <Link to="/">
                        <IconContext.Provider value={{ color: "#D64933", size: '40px' }}>
                            <AiFillHome />
                        </IconContext.Provider>
                    </Link>
                </li>
                <li>
                    <Link to="/scoreboard">
                        <IconContext.Provider value={{ color: "#ACDDE7", size: '40px' }}>
                            <RiAdminFill />
                        </IconContext.Provider>
                    </Link>
                </li>
            </ul>
        </nav>
    )
}
