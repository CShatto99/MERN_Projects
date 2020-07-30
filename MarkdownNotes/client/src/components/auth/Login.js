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
import { login } from '../../store/user'

const Login = () => {
  const dispatch = useDispatch()
  const { isAuthenticated, loading } = useSelector(state => state.user)
  const [state, setState] = useState({
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

    const { email, password } = state

    dispatch(login({ email, password }))
  }

  if(isAuthenticated) return <Redirect to='/' />

  return (
    <div>
      <div className='form-title'>
        <h2 className='text-center'>Login</h2>
      </div>
      <div className='form-section'>
        <Form onSubmit={e => onSubmit(e)}>
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
          <Button color='primary' block>Login</Button>
        </Form>
      </div>
    </div>
  )
}

export default Login
