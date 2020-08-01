import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, Link } from 'react-router-dom'
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Alert
} from 'reactstrap'
import { login } from '../../store/auth'
import { clearAlert } from '../../store/alert'

const Login = () => {
  const dispatch = useDispatch()
  const { isAuthenticated } = useSelector(state => state.auth)
  const { msg } = useSelector(state => state.alert)
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

  if(isAuthenticated) return <Redirect to='/home' />

  return (
    <div>
      <div className='form-title'>
        <h2 className='text-center'>Login</h2>
      </div>
      <div className='form-section'>
        <Form onSubmit={e => onSubmit(e)}>
          {msg && <Alert color='danger'>{msg}</Alert>}
          <small className='text-danger'>* = required</small>
          <FormGroup>
            <Label for='email'>Email <span className='text-danger'>*</span></Label>
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
            <Label for='password'>Password <span className='text-danger'>*</span></Label>
            <Input
              type='password'
              id='password'
              name='password'
              placeholder='Enter your password'
              value={state.password}
              onChange={e => onChange(e)}
            />
          </FormGroup>
          <div className='text-center'>
            <Button style={{width: '30%'}} className='mr-3' color='primary'>
              Login
            </Button>
            <Button style={{width: '30%'}} color='light' onClick={() => dispatch(clearAlert())}>
              <Link className='std-link' to='/'>
                Go Back
              </Link>
            </Button>
          </div>
        </Form>
      </div>
    </div>
  )
}

export default Login