import React, { Fragment, useState, useEffect, useRef } from 'react'
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
import { updateVisited } from '../store/profile'

const Checklist = () => {
  const dispatch = useDispatch()
  const { visited, loading } = useSelector(state => state.profile)
  const [state, setState] = useState({
    isOpen: false,
    visited: []
  })

  useEffect(() => {
    setState({
      ...state,
      visited: [...visited]
    })
  }, [visited])

  const toggle = () => {
    setState({
      ...state,
      isOpen: !state.isOpen
    })
  }

  const onSubmit = e => {
    e.preventDefault()

    dispatch(updateVisited("5f34ca4308e75a1e04e37618", state.visited))

    toggle()
  }

  const onClick = region => {
    !state.visited.includes(region) ?
      setState({
        ...state,
        visited: [...state.visited, region]
      }) :
      setState({
        ...state,
        visited: state.visited.filter(element => element !== region)
      })
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
            {!loading && (
              <ListGroup>
                {usa.map(region => (
                  <Button key={region.name} id={region.name} className='text-left' onClick={() => onClick(region.name)} color='light' block>
                    {region.name}
                    {state.visited.includes(region.name) ? <span className='float-right text-success'>VISITED</span> : ''}
                  </Button>
                ))}
              </ListGroup>
            )}
          </Form>
        </ModalBody>
      </Modal>
    </Fragment>
  )
}

export default Checklist
