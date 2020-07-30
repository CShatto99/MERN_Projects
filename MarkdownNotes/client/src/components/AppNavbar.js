import React, { Fragment, useState } from 'react'
import { useSelector } from 'react-redux'
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

const AppNavbar = () => {
  const { isAuthenticated, loading } = useSelector(state => state.user)
  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => {
    setIsOpen(!isOpen)
  }

  const userLinks = (
    <Fragment>
      <NavItem>
        <NavLink>
          <Link className='nav-item' to='/'>Home</Link>
        </NavLink>
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
          <NavbarBrand>Markdown Notes</NavbarBrand>
          <NavbarToggler onClick={toggle}/>
          <Collapse isOpen={isOpen} navbar>
            <Nav className='ml-auto' navbar>
            {isAuthenticated && !loading ?
              userLinks : guestLinks
            }
              <NavItem>
                <NavLink className='nav-item' href='https://github.com/CShatto99'>Github</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </div>
  )
}

export default AppNavbar
