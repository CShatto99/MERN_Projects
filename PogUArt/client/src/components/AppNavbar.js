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
import xqcphp from '../img/xqcphp.jpeg'

const AppNavbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => setIsOpen(!isOpen)
  return (
    <div>
      <Navbar dark expand='sm'>
        <Container>
          <NavbarBrand href='/'><img className='mr-2' src={xqcphp} alt='xqcphp' width='30px'/>Pogu Art</NavbarBrand>
          <NavbarToggler onClick={toggle}/>
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href='/'>Sources coming soon</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href='https://www.twitch.tv/xqcow'>xQcOW</NavLink>
              </NavItem>
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
