import React, {useState, useEffect} from 'react';

export default function PlayerCard({playerName, totalBuyIns, winnings}) {
    const [plusMinus, setPlusMinus] = useState(0);
    
    const calculatePlusMinus = () => {
        setPlusMinus(winnings - totalBuyIns);
    }

    useEffect(() => {
        calculatePlusMinus()
    });

    return (
        <div className="grid">
            <div>{playerName}</div>
            <div className="noMobileDisplay">{totalBuyIns}</div>
            <div className="noMobileDisplay">{winnings}</div>
            <div>{plusMinus}</div>
        </div>
    )
}
