import React, {useState} from 'react'
import { Button, Form, Input } from 'semantic-ui-react'

const EntryForm = ({addRow}) => {
  const [playerName, setPlayerName] = useState('')
  const [buyIn, setBuyIn] = useState('')
    return (
      <div>
      {/* Inline styling was used to make it easier to target and override semantic ui component styling */}
        <Form>
          <Form.Field style={{margin: 0}}>
            <label style={{fontSize: '20px', color: 'white', fontWeight: 400}}>Player Name</label>
            <Input className="input" placeholder='First Last' onChange={(e) => setPlayerName(e.target.value)} />
          </Form.Field>
          <Form.Field>
            <label style={{fontSize: '20px', color: 'white', fontWeight: 400}}>Buy-in Amount</label>
            <Input className="input" placeholder='20' onChange={(e) => setBuyIn(e.target.value)} />
          </Form.Field>
          <Button color="blue" type='submit' onClick={() => addRow(playerName, buyIn)}>Submit</Button>
        </Form>
      </div>
  )
}

export default EntryForm