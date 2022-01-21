import React, {useState} from 'react'
import { Button, Form } from 'semantic-ui-react'

const EntryForm = ({addRow}) => {
  const [playerName, setPlayerName] = useState('')
  const [buyIn, setBuyIn] = useState('')
  const [winnings, setWinnings] = useState(0);
    return (
      <div>
        <Form>
          <Form.Field>
            <label>Player Name</label>
            <input placeholder='First Last' onChange={(e) => setPlayerName(e.target.value)} />
          </Form.Field>
          <Form.Field>
            <label>Buy-in Amount</label>
            <input placeholder='20' onChange={(e) => setBuyIn(e.target.value)} />
          </Form.Field>
          <Form.Field>
            <label>Winnings</label>
            <input placeholder='20' onChange={(e) => setWinnings(e.target.value)} />
          </Form.Field>
          <Button type='submit' onClick={() => addRow(playerName, buyIn, winnings)}>Submit</Button>
        </Form>
      </div>
  )
}

export default EntryForm