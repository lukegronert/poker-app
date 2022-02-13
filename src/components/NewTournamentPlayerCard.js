import React from 'react';
import { Button, Table } from 'semantic-ui-react';

export default function PlayerCard({playerName, totalBuyIns, addRebuy, removePlayer, winnings}) {
    return (
            <div className="scoreboardGrid">
                <div className="playerName">{playerName}</div>
                <div className="totalBuyIns">{totalBuyIns}</div>
                <div className="winnings">{winnings}</div>
                <div className="buttonGrid">
                    <Button color="green" onClick={() => addRebuy(playerName)}>+$20</Button>
                    <Button color="red" onClick={() => removePlayer(playerName)}></Button>
                </div>
            </div>
    )
}
