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
        <Link
          to="/login"
          className="nav-link sibling-hover text-gray-400 hover:text-gray-200"
        >
          Login
        </Link>
        <div className="sibling-highlight" />
      </NavItem>
      <NavItem>
        <Link
          to="/register"
          className="gen-btn nav-link bg-blue-700 text-white font-medium mt-1 ml-1 py-1 px-2 rounded-lg hover:bg-blue-800"
        >
          Register
        </Link>
      </NavItem>
    </Fragment>
  );

  const userLinks = (
    <Fragment>
      <NavItem>
        <Link
          to="/map"
          className="nav-link sibling-hover text-gray-400 hover:text-gray-200"
        >
          Map
        </Link>
        <div className="sibling-highlight" />
      </NavItem>
      <UncontrolledDropdown nav inNavbar>
        <DropdownToggle className="text-gray-400 hover:text-gray-200" nav caret>
          Profile
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem>
            <Link to="/settings" className="text-black no-underline">
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
    <Navbar className="bg-transparent" expand="sm">
      <Container>
        <i
          className="gen-btn fa fa-globe fa-3x cursor-pointer mt-1 hover:text-blue-800"
          aria-hidden="true"
        ></i>
        <NavbarBrand href="/" className="text-gray-100 ml-3">
          <div className="gen-btn text-3xl font-medium hover:text-blue-800">
            GeoLogger
          </div>
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <Link
                to="/"
                className="nav-link sibling-hover text-gray-400 hover:text-gray-200"
              >
                Home
              </Link>
              <div className="sibling-highlight" />
            </NavItem>
            {isAuth ? userLinks : guestLinks}
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
