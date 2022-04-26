import React, {useState, useEffect} from 'react';

export default function PlayerCard({playerName, totalBuyIns, winnings, isUser}) {
    const [plusMinus, setPlusMinus] = useState(0);
    const [plusMinusColor, setPlusMinusColor] = useState('grey')
    
    const calculatePlusMinus = () => {
        setPlusMinus(winnings - totalBuyIns);
        if(plusMinus > 0) {
            //green
            setPlusMinusColor('#35FF69')
        } else if (plusMinus < 0) {
            //red
            setPlusMinusColor('#ff4557')
        }
    }

    useEffect(() => {
        calculatePlusMinus()
    });
    if(isUser) {
        return (
            <div className="homeGrid">
                <div className="playerName" style={{color: 'yellow'}}>{playerName}</div>
                <div className="noMobileDisplay buyIns">{totalBuyIns}</div>
                <div className="noMobileDisplay winnings">{winnings}</div>
                <div className="plusMinus" style={{color: plusMinusColor}}>{plusMinus}</div>
            </div>
        )
    } else {
        return (
            <div className="homeGrid">
                <div className="playerName">{playerName}</div>
                <div className="noMobileDisplay buyIns">{totalBuyIns}</div>
                <div className="noMobileDisplay winnings">{winnings}</div>
                <div className="plusMinus" style={{color: plusMinusColor}}>{plusMinus}</div>
            </div>
        )
    }
}
