import React, { Fragment, useState } from 'react'
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody
} from 'reactstrap'

const DeleteAccount = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => setIsOpen(!isOpen)

  return (
    <Fragment>
      <Button onClick={toggle} style={{width: '30%'}} color='danger'>
        Delete Account <i className="fa fa-trash" aria-hidden="true"></i>
      </Button>
      <Modal isOpen={isOpen}>
        <ModalHeader toggle={toggle}>
          Warning
        </ModalHeader>
        <ModalBody>
          <p>This will permanently delete your account and all of its content.</p>
          <p>
            Are you sure?
            <Button color='danger' size='sm'>Yes</Button>
            <Button color='primary' size='sm'>No</Button>
          </p>
        </ModalBody>
      </Modal>
    </Fragment>
  )
}

export default DeleteAccount
