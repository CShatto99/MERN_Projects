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
} from "reactstrap";
import { useSelector } from "react-redux";

const AppNavbar = () => {
  const { isAuth } = useSelector(state => state.auth);
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const loggedIn = false;

  const guestLinks = (
    <Fragment>
      <NavItem>
        <Link to="/register" className="nav-link">
          Register
        </Link>
      </NavItem>
      <NavItem>
        <Link to="/login" className="nav-link">
          Login
        </Link>
      </NavItem>
    </Fragment>
  );

  const userLinks = (
    <Fragment>
      <NavItem>
        <Link to="/map" className="nav-link">
          Map
        </Link>
      </NavItem>
      <NavItem>
        <Link to="/settings" className="nav-link">
          Settings
        </Link>
      </NavItem>
    </Fragment>
  );

  return (
    <div>
      <Navbar color="dark" dark expand="sm">
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
                <Link to="/" className="nav-link">
                  Home
                </Link>
              </NavItem>
              {isAuth ? userLinks : guestLinks}
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default AppNavbar;
