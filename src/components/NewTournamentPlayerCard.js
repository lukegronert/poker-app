import React from 'react';
import { Button, Table } from 'semantic-ui-react';

export default function PlayerCard({playerName, totalBuyIns, addRebuy, removePlayer, winnings}) {
    return (
            <Table.Row className="tableRow">
                <Table.Cell textAlign="center">
                    <Button color="green" onClick={() => addRebuy(playerName)}>$20</Button>
                </Table.Cell>
                <Table.Cell textAlign="center">{playerName}</Table.Cell>
                <Table.Cell textAlign="center"><span className="mobileDescriptionSpan">Buy Ins: </span>{totalBuyIns}</Table.Cell>
                <Table.Cell textAlign="center"><span className="mobileDescriptionSpan">Winnings: </span>{winnings}</Table.Cell>
                <Table.Cell textAlign="center">
                    <Button color="red" onClick={() => removePlayer(playerName)}>Delete</Button>
                </Table.Cell>
            </Table.Row>
    )
}
