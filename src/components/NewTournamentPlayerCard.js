import React from 'react';
import ConfirmModal from './Modal';
import { Button } from 'semantic-ui-react';
import { FaTrashAlt } from 'react-icons/fa';

export default function PlayerCard({playerName, totalBuyIns, addRebuy, removePlayer, winnings}) {
    return (
            <div className="scoreboardGrid">
                <div className="playerName">{playerName}</div>
                <div className="totalBuyIns">{totalBuyIns}</div>
                <div className="winnings">{winnings}</div>
                <div className="buttonGrid">
                    <ConfirmModal title="Rebuy" buttonText="+$20" buttonColor="green" content={`Add a $20 REBUY for \n${playerName}?`} icon="money"
                                  clickFunction={addRebuy} clickFunctionArgument={playerName} />
                    <ConfirmModal title="Delete Player" buttonText={<FaTrashAlt />} buttonColor="red" content={`Are you sure you want to DELETE \n${playerName}?`}
                                  icon="user delete" clickFunction={removePlayer} clickFunctionArgument={playerName} />
                </div>
            </div>
    )
}
