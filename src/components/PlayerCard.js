import React from 'react'

export default function PlayerCard({playerName, totalBuyIns, addRebuy, removePlayer}) {
    return (
        <tr>
            <td>{playerName}</td>
            <td>{totalBuyIns}</td>
            <td><button onClick={() => addRebuy(playerName)}>Buy In $20</button></td>
            <td><button onClick={() => removePlayer(playerName)}>Delete Player</button></td>
        </tr>
    )
}
