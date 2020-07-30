import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap'
import { register } from '../../store/user'

const Register = () => {
  const dispatch = useDispatch()
  const { isAuthenticated, loading } = useSelector(state => state.user)
  const [state, setState] = useState({
    name: '',
    email: '',
    password: ''
  })

  const onChange = e => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    })
  }

  const onSubmit = e => {
    e.preventDefault()

    const { name, email, password } = state

    const user = { name, email, password }

    dispatch(register(user))
  }

    if(isAuthenticated) return <Redirect to='/' />

  return (
    <div>
      <div className='form-title'>
        <h2 className='text-center'>Register</h2>
      </div>
      <div className='form-section'>
        <Form onSubmit={e => onSubmit(e)}>
          <FormGroup>
            <Label for='name'>Name</Label>
            <Input
              type='text'
              id='name'
              name='name'
              placeholder='Enter your name'
              value={state.name}
              onChange={e => onChange(e)}
            />
          </FormGroup>
          <FormGroup>
            <Label for='email'>Email</Label>
            <Input
              type='email'
              id='email'
              name='email'
              placeholder='Enter your email'
              value={state.email}
              onChange={e => onChange(e)}
            />
          </FormGroup>
          <FormGroup>
            <Label for='password'>Password</Label>
            <Input
              type='password'
              id='password'
              name='password'
              placeholder='Enter your password'
              value={state.password}
              onChange={e => onChange(e)}
            />
          </FormGroup>
          <Button color='primary' block>Register</Button>
        </Form>
      </div>
    </div>
  )
}

export default Register
