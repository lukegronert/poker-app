import React, {useState, useEffect} from 'react';
import {Table} from 'semantic-ui-react';

export default function PlayerCard({playerName, totalBuyIns, winnings}) {
    const [plusMinus, setPlusMinus] = useState(0);
    const [positive, setPositive] = useState(false);
    const [negative, setNegative] = useState(false);
    
    const calculatePlusMinus = () => {
        setPlusMinus(winnings - totalBuyIns);
        if(plusMinus > 0) {
            setPositive(true)
            setNegative(false)
        } else if (plusMinus < 0) {
            setNegative(true)
            setPositive(false)
        }
    }

    useEffect(() => {
        calculatePlusMinus()
    });

    return (
        <Table.Row>
            <Table.Cell>{playerName}</Table.Cell>
            <Table.Cell>{totalBuyIns}</Table.Cell>
            <Table.Cell>{winnings}</Table.Cell>
            <Table.Cell positive={positive} negative={negative}>{plusMinus}</Table.Cell>
        </Table.Row>
    )
}
