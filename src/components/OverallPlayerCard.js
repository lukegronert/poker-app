import React from 'react'

export default function PlayerCard({playerName, totalBuyIns}) {
    return (
        <tr>
            <td>{playerName}</td>
            <td>{totalBuyIns}</td>
        </tr>
    )
}
