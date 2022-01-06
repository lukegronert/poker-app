import axios from 'axios';
import React, {useState, useEffect} from 'react'
import { Button, Form, Table } from 'semantic-ui-react'

const EntryForm = () => {
  const [playerName, setPlayerName] = useState('');
  const [buyIn, setBuyIn] = useState(0);
  const [sheetData, setSheetData] = useState([]);
  const [refresh, setrefresh] = useState([]);

  const onSubmit = () => {
    axios.post('https://sheet.best/api/sheets/97f49947-f1fb-4c95-b5d7-b5437de7a6bc', {
      playerName, buyIn
    })
  }

  useEffect(() => {
    axios.get('https://sheet.best/api/sheets/97f49947-f1fb-4c95-b5d7-b5437de7a6bc')
      .then((apiData) => {
        setSheetData(apiData.data)
      })
      .then((data) => {
        setrefresh(data)
      })
  }, [refresh])
    return (
      <div>
        <Form>
          <Form.Field>
            <label>Player Name</label>
            <input placeholder='First Last' onChange={(e) => setPlayerName(e.target.value)}  />
          </Form.Field>
          <Form.Field>
            <label>Buy-in Amount</label>
            <input placeholder='$20' onChange={(e) => setBuyIn(e.target.value)} />
          </Form.Field>
          <Button type='submit' onClick={onSubmit}>Submit</Button>
        </Form>

        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Player</Table.HeaderCell>
              <Table.HeaderCell>Money</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
          {sheetData.map((entry) => {
            return (
            <Table.Row>
              <Table.Cell>{entry.playerName}</Table.Cell>
              <Table.Cell>{entry.buyIn}</Table.Cell>
            </Table.Row>
            )
          })}
          </Table.Body>
          </Table>
      </div>
  )
}

export default EntryForm