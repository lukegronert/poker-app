import React from 'react';
import { Button, Table } from 'semantic-ui-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'

export default function PlayerCard({playerName, totalBuyIns, addRebuy, removePlayer, winnings}) {
    return (
            <div className="scoreboardGrid">
                <div className="playerName">{playerName}</div>
                <div className="totalBuyIns">{totalBuyIns}</div>
                <div className="winnings">{winnings}</div>
                <div className="buttonGrid">
                    <Button color="green" onClick={() => addRebuy(playerName)}>+$20</Button>
                    <Button color="red" onClick={() => removePlayer(playerName)}><FontAwesomeIcon icon={faTrashCan} /></Button>
                </div>
            </div>
    )
}
