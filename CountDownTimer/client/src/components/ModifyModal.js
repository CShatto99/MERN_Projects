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
import { modifyTimer } from '../store/timer'

const ModifyModal = () => {
  const dispatch = useDispatch()
  const [isOpen, setIsOpen] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    date: '',
    time: ''
  })

  const toggle = () => {
    setIsOpen(!isOpen)
  }

  const onChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const onSubmit = e => {
    e.preventDefault()

    dispatch(modifyTimer(formData))

    toggle()
  }

  return (
    <div>
      <div className='d-flex justify-content-center'>
        <Button className='mt-3' color='primary' onClick={toggle}>Modify Timer</Button>
      </div>

      <Modal color='dark' isOpen={isOpen} toggle={toggle}>
        <ModalHeader toggle={toggle}>Modify Timer</ModalHeader>
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
                <small style={{color: 'red'}}>* Date must be in MM-DD-YYYY format</small>
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
                Time (Optional)<br/>
                <small>Time must be in hh:mm:ss format</small>
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
            <Button color='primary' block>Modify Timer</Button>
          </Form>
        </ModalBody>
      </Modal>

    </div>
  )
}

export default ModifyModal
