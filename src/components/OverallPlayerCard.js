import React from 'react'

export default function PlayerCard({playerName, totalBuyIns, winnings}) {
    return (
        <tr>
            <td>{playerName}</td>
            <td>{totalBuyIns}</td>
            <td>{winnings}</td>
        </tr>
    )
}
