import React, {useState, useEffect} from 'react';
import {Table} from 'semantic-ui-react';

export default function PlayerCard({playerName, totalBuyIns, winnings}) {
    const [plusMinus, setPlusMinus] = useState(0);
    
    const calculatePlusMinus = () => {
        setPlusMinus(winnings - totalBuyIns);
    }

    useEffect(() => {
        calculatePlusMinus()
    }, [])
    return (
        <Table.Row>
            <Table.Cell>{playerName}</Table.Cell>
            <Table.Cell>{totalBuyIns}</Table.Cell>
            <Table.Cell>{winnings}</Table.Cell>
            <Table.Cell>{plusMinus}</Table.Cell>
        </Table.Row>
    )
}
