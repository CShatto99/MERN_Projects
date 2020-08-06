import React, { Fragment } from 'react'
import { Redirect } from 'react-router-dom'
import {
  Jumbotron,
  Button,
  Spinner
} from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../store/auth'
import DeleteAccount from './DeleteAccount'
import EditAccount from './EditAccount'

const Account = ({ match }) => {
  const dispatch = useDispatch()
  const { isAuthenticated, loading, user } = useSelector(state => state.auth)

  if(!isAuthenticated)
    return <Redirect to='/login' />

  return (
    <Jumbotron className='text-center'>
      {loading ?
        <Spinner color='primary'/> : (
        <Fragment>
          <h1>{user.name}</h1>
          <p className='lead'>{user.email}</p>
          <hr/>
            <EditAccount />
            <Button onClick={() => dispatch(logout())} className='mr-3 is-mobile' color='primary'>
              Logout <i className="fa fa-sign-out" aria-hidden="true"></i>
            </Button>
            <DeleteAccount />
        </Fragment>
      )}
    </Jumbotron>
  )
}

export default Account
