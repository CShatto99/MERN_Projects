import React, { Fragment, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Modal,
  ModalHeader,
  ModalBody,
  ListGroup,
  ListGroupItem,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Row
} from 'reactstrap'
import usa from '../json/US.json'
import { updateVisited } from '../store/mapbox'

const Checklist = () => {
  const dispatch = useDispatch()
  const { visited } = useSelector(state => state.mapbox)
  const [state, setState] = useState({
    isOpen: false,
    visited: []
  })

  const toggle = () => {
    setState({
      ...state,
      isOpen: !state.isOpen
    })
  }

  const onChange = e => {
    e.target.checked ?
      setState({
        ...state,
        visited: [...state.visited, e.target.name]
      }) :
      setState({
        ...state,
        visited: state.visited.filter(element => element != e.target.name)
      })
  }

  const onSubmit = e => {
    e.preventDefault()

    dispatch(updateVisited(state.visited))
  }

  return (
    <Fragment>
      <Row className='justify-content-center'>
        <Button color='dark' onClick={toggle} block>Add States</Button>
      </Row>
      <Modal isOpen={state.isOpen}>
        <ModalHeader toggle={toggle}>Add Some States</ModalHeader>
        <ModalBody>
          <Form onSubmit={e => onSubmit(e)}>
            <Button color='dark' className='mb-2' block>Save</Button>
            <Button color='primary' className='mb-3' onClick={toggle} block>Finish</Button>
            <ListGroup>
              {usa.map(state => (
                  <ListGroupItem key={state.name} className='mb-2 border rounded'>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        name={state.name}
                        value={state.name}
                        id={state.name}
                        className="form-check-input"
                        onChange={e => onChange(e)}
                      />
                      <label className="form-check-label" for={state.name}>{state.name}</label>
                    </div>
                  </ListGroupItem>
              ))}
            </ListGroup>
          </Form>
        </ModalBody>
      </Modal>

    </Fragment>

  )
}

export default Checklist
