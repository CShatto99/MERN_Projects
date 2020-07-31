import React, { Fragment, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Collapse,
  Container
} from 'reactstrap'
import { logout } from '../store/auth'

const AppNavbar = () => {
  const dispatch = useDispatch()
  const { isAuthenticated, loading } = useSelector(state => state.auth)
  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => setIsOpen(!isOpen)

  const userLinks = (
    <Fragment>
      <NavItem>
        <NavLink>
          <Link className='nav-item' to='/home'>Home</Link>
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink onClick={() => dispatch(logout())} style={{cursor: 'pointer'}}>Logout</NavLink>
      </NavItem>
    </Fragment>
  )

  const guestLinks = (
    <Fragment>
      <NavItem>
        <NavLink>
          <Link className='nav-item' to='/login'>Login</Link>
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink>
          <Link className='nav-item' to='/register'>Register</Link>
        </NavLink>
      </NavItem>
    </Fragment>
  )

  return (
    <div>
      <Navbar className='mb-5' color='primary' dark expand='sm'>
        <Container>
          <NavbarBrand><Link className='nav-item' to='/hero'>Markdown Notes</Link></NavbarBrand>
          <NavbarToggler onClick={toggle}/>
          <Collapse isOpen={isOpen} navbar>
            <Nav className='ml-auto' navbar>
            {isAuthenticated && !loading ?
              userLinks : guestLinks
            }
              <NavItem>
                <NavLink className='nav-item' target='_blank' href='https://github.com/CShatto99'>Github</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </div>
  )
}

export default AppNavbar
