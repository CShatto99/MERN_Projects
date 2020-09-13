import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button,
} from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/auth";

const AppNavbar = () => {
  const dispatch = useDispatch();
  const { isAuth } = useSelector(state => state.auth);
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const loggedIn = false;

  const guestLinks = (
    <Fragment>
      <NavItem>
        <Link to="/register" className="nav-link text-white">
          Register
        </Link>
      </NavItem>
      <NavItem>
        <Link to="/login" className="nav-link text-white">
          Login
        </Link>
      </NavItem>
    </Fragment>
  );

  const userLinks = (
    <Fragment>
      <NavItem>
        <Link to="/map" className="nav-link text-white">
          Map
        </Link>
      </NavItem>
      <UncontrolledDropdown nav inNavbar>
        <DropdownToggle className="text-white" nav caret>
          Profile
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem>
            <Link
              to="/settings"
              className="text-black no-underline"
            >
              Settings
            </Link>
          </DropdownItem>
          <DropdownItem divider />
          <DropdownItem onClick={() => dispatch(logout())}>Logout</DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    </Fragment>
  );

  return (
    <Navbar
      className="bg-gradient-to-r from-blue-800 to-blue-200"
      dark
      expand="sm"
    >
      <Container>
        <NavbarBrand
          href="https://github.com/CShatto99/MERN_Projects/tree/master/GeoLogger"
          target="__blank"
        >
          GeoLogger
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <Link to="/" className="nav-link text-white">
                Home
              </Link>
            </NavItem>
            {isAuth ? userLinks : guestLinks}
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
