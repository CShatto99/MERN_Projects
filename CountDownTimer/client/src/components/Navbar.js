import React, { useState } from 'react'
import {
  Container,
  Collapse,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap'

const AppNavbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div>
      <Navbar color='dark' dark expand='sm' className='mb-4'>
        <Container>
          <NavbarBrand>Countdown Timer</NavbarBrand>
          <NavbarToggler onClick={() => setIsOpen(!isOpen)} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className='ml-auto' navbar>
              <NavItem>
                <NavLink href='https://github.com/CShatto99' target='_blank'>Github</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </div>
  )
}

export default AppNavbar
