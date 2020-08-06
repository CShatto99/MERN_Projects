import React, { Fragment } from 'react'
import {
  Jumbotron,
  Button,
  Spinner
} from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../store/auth'
import DeleteAccount from './DeleteAccount'

const Account = ({ match }) => {
  const dispatch = useDispatch()
  const { loading, user } = useSelector(state => state.auth)



  return (
    <Jumbotron className='text-center'>
      {loading ?
        <Spinner color='primary'/> : (
        <Fragment>
          <h1>{user.name}</h1>
          <p className='lead'>{user.email}</p>
          <hr/>
          <Button onClick={() => dispatch(logout())} style={{width: '30%'}} className='mr-3' color='primary'>
            Logout <i class="fa fa-sign-out" aria-hidden="true"></i>
          </Button>
          <Button style={{width: '30%'}} className='mr-3' color='primary'>
            Edit Account <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
          </Button>
          <DeleteAccount />
        </Fragment>
      )}
    </Jumbotron>
  )
}

export default Account
