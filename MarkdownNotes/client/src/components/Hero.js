import React from 'react'
import { Redirect, Link } from 'react-router-dom'
import {
  Jumbotron,
  Button
} from 'reactstrap'
import { useSelector } from 'react-redux'

const Hero = () => {
  const { isAuthenticated } = useSelector(state => state.auth)

  if(isAuthenticated)
    return <Redirect to='/home' />

  return (
    <div>
      <Jumbotron className='text-center'>
        <h1>Welcome to Markdown Notes</h1>
        <p className='lead'>
          This is a simple web app that allows you to keep track of a list of{' '}
          <a
            className='std-link'
            target='_blank'
            rel='noopener noreferrer'
            href='https://en.wikipedia.org/wiki/Markdown#:~:text=Markdown%20is%20a%20lightweight%20markup,using%20a%20plain%20text%20editor.'
          >
            markdown
          </a>{' '}
          notes
        </p>
        <hr />
        <Button style={{width: '30%'}} className='mr-3' color='primary'>
          <Link className='nav-item' to='/register'>
            Register
          </Link>
        </Button>
        <Button style={{width: '30%'}} color='light'>
          <Link className='std-link' to='/login'>
            Login
          </Link>
        </Button>
      </Jumbotron>
    </div>
  )
}

export default Hero
