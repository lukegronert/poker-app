import React from 'react';
import { Button, Table } from 'semantic-ui-react';

export default function PlayerCard({playerName, totalBuyIns, addRebuy, removePlayer, winnings}) {
    return (
        <Table.Row>
            <Table.Cell>{playerName}</Table.Cell>
            <Table.Cell>{totalBuyIns}</Table.Cell>
            <Table.Cell>{winnings}</Table.Cell>
            <Table.Cell><Button onClick={() => addRebuy(playerName)}>Buy In $20</Button></Table.Cell>
            <Table.Cell><Button onClick={() => removePlayer(playerName)}>Delete Player</Button></Table.Cell>
        </Table.Row>
    )
}
