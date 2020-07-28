import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap'
import { addTimer, getReq } from '../store/timer'

const EventModal = () => {
  const dispatch = useDispatch()
  const [isOpen, setIsOpen] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    date: '',
    time: ''
  })

  const toggle = () => setIsOpen(!isOpen)

  const onChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const onSubmit = e => {
    e.preventDefault()

    dispatch(addTimer(formData))

    toggle()
  }

  return (
    <div>
      <Button color='secondary' onClick={toggle}>Add Timer</Button>

      <Modal isOpen={isOpen} toggle={toggle}>
        <ModalHeader toggle={toggle}>Add Timer</ModalHeader>
        <ModalBody>
          <Form onSubmit={e => onSubmit(e)}>
            <FormGroup>
              <Label for='name'>Name</Label>
              <Input
                type='text'
                id='name'
                name='name'
                placeholder='Event name'
                value={formData.name}
                onChange={e => onChange(e)}
              />
            </FormGroup>
            <FormGroup>
              <Label for='date'>
                Date <br/>
                <small style={{color: 'red'}}>* Date must be in YYYY-DD-MM format</small>
              </Label>
              <Input
                type='text'
                id='date'
                name='date'
                placeholder='Enter a date'
                value={formData.date}
                onChange={e => onChange(e)}
              />
            </FormGroup>
            <FormGroup>
              <Label for='time'>
                Time <br/>
                <small>Enter 3 comma-separated numbers, e.g. 8, 34, 22</small>
              </Label>
              <Input
                type='text'
                id='time'
                name='time'
                placeholder='Event ending time'
                value={formData.time}
                onChange={e => onChange(e)}
              />
            </FormGroup>
            <Button color='warning' block>Add Event</Button>
          </Form>
        </ModalBody>
      </Modal>

    </div>
  )
}

export default EventModal
