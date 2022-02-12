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
        <div className="homeGrid">
            <div className="playerName">{playerName}</div>
            <div className="noMobileDisplay buyIns">{totalBuyIns}</div>
            <div className="noMobileDisplay winnings">{winnings}</div>
            <div className="plusMinus">{plusMinus}</div>
        </div>
    )
}
