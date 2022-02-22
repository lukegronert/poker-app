import React, { useState } from 'react'
import { Button, Header, Icon, Modal } from 'semantic-ui-react'

export default function ConfirmModal({title, content, buttonText, clickFunction, clickFunctionArgument, buttonColor, icon}) {
  const [open, setOpen] = React.useState(false)

  const yesButton = () => {
      clickFunction(clickFunctionArgument)
      setOpen(false)
  }

  return (
    <Modal
      basic
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      size='small'
      trigger={<Button color={buttonColor}>{buttonText}</Button>}
    >
      <Header icon className="modal-header" >
        <Icon name={icon} />
        {title}
      </Header>
      <Modal.Content>
        <p className="display-linebreak" style={{ fontSize: '1.5rem', textAlign: 'center'}}>
          {content}
        </p>
      </Modal.Content>
      <Modal.Actions>
        <Button basic color='red' inverted onClick={() => setOpen(false)}>
          <Icon name='remove' /> No
        </Button>
        <Button color='green' inverted onClick={() => yesButton()}>
          <Icon name='checkmark' /> Yes
        </Button>
      </Modal.Actions>
    </Modal>
  )
}