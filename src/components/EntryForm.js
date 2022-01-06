import React from 'react'
import { Button, Form } from 'semantic-ui-react'

const EntryForm = () => {
    return (
      <div>
        <Form>
          <Form.Field>
            <label>Player Name</label>
            <input placeholder='First Last' />
          </Form.Field>
          <Form.Field>
            <label>Buy-in Amount</label>
            <input placeholder='$20' />
          </Form.Field>
          <Button type='submit'>Submit</Button>
        </Form>
      </div>
  )
}

export default EntryForm