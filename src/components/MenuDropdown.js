import React from 'react'
import {Link} from 'react-router-dom'
import { Dropdown, Icon } from 'semantic-ui-react'
import netlifyIdentity from 'netlify-identity-widget';

export default function MenuDropdown() {
    return (
        <Dropdown text='Menu' floating labeled button className='icon' style={{color: "white", background: "darkslategrey"}}>
            <Dropdown.Menu style={{background: "darkslategrey"}}>
                <Dropdown.Item style={{textAlign: "right"}}>
                    <a className="login-a" onClick={() => netlifyIdentity.open()}>Login</a>
                </Dropdown.Item>
                <Dropdown.Item style={{textAlign: "right"}}>
                    <Link to="/leaderboard">
                        Leaderboard
                    </Link>
                </Dropdown.Item>
                <Dropdown.Item style={{textAlign: "right"}}>
                    <Link to="/scoreboard">
                        Admin
                    </Link>
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    )
}