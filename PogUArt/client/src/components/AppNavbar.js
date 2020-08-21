import React, { useState } from 'react'
import {
  Container,
  Navbar,
  Nav,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  NavItem,
  NavLink,
} from 'reactstrap'

const AppNavbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => setIsOpen(!isOpen)
  return (
    <div>
      <Navbar dark expand='sm'>
        <Container>
          <NavbarBrand href='/'>Pogu Art</NavbarBrand>
          <NavbarToggler onClick={toggle}/>
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href='https://github.com/CShatto99/MERN_Projects/tree/master/PogUArt' target='__blank'>Github</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </div>

  )
}

export default AppNavbar
