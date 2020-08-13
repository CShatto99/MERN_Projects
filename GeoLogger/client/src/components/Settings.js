import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap'

const Settings = () => {
  const dispatch = useDispatch()
  const { profile } = useSelector(state => state.profile)
  const [state, setState] = useState({
    isOpen: false,
    fillColor: profile.fillColor
  })

  const onChange = e => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    })
  }

  const toggle = () => {
    setState({
      ...state,
      isOpen: !state.isOpen
    })
  }

  const onSubmit = e => {
    e.preventDefault()

    //dispatch(updateFill(state.fillColor))
  }

  return (
    <Container className='text-center'>
      <Row className='justify-content-center mb-3'>
        <Button color='dark' href='/'>Go Back</Button>
      </Row>
      <hr style={{backgroundColor: '#fff'}}/>
      <Row className='justify-content-center'>
        <Form onSubmit={e => onSubmit(e)}>
          <FormGroup>
            <Label className='text-light' for='fillColor'>
              <h3>Region Highlight Color</h3>
            </Label>
            <Input
              onChange={e => onChange(e)}
              type='text' id='fillColor'
              name='fillColor'
              placeholder='Color'
              value={profile.fillColor}
            />
          </FormGroup>
          <Button color='dark' block>Save </Button>
          <p className='text-light mt-2'>
            Click{' '}
            <a
              className='std-link'
              href='https://htmlcolorcodes.com/color-picker/'
              target='_blank'
              rel="noopener noreferrer"
            >
              here
            </a>{' '}
            for hex color codes
          </p>
        </Form>
      </Row>
      <hr style={{backgroundColor: '#fff'}}/>
    </Container>
  )
}

export default Settings
