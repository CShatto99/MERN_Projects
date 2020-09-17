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
} from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/auth";

const AppNavbar = () => {
  const dispatch = useDispatch();
  const { isAuth } = useSelector(state => state.auth);
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownActive, setDropdownActive] = useState(false);

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
        <div
          to="/map"
          className="nav-link cursor-pointer text-gray-400 hover:text-gray-200"
          onClick={() => setDropdownActive(!dropdownActive)}
        >
          Profile
        </div>
        <ul
          className={
            dropdownActive
              ? "dropdown-active bg-gray-200 text-black p-3"
              : "dropdown-closed"
          }
        >
          <li className="mb-2">
            <Link to="/settings" className="text-black no-underline">
              Settings
            </Link>
          </li>
          <li
            className="gen-btn cursor-pointer"
            onClick={() => dispatch(logout())}
          >
            Logout
          </li>
        </ul>
      </UncontrolledDropdown>
    </Fragment>
  );

  return (
    <div className="flex justify-center">
      <nav className="pt-3 pl-5 pr-5 max-w-6xl w-full flex justify-between">
        <div className="flex items-center">
          <i
            className="gen-btn fa fa-globe fa-3x cursor-pointer hover:text-blue-800"
            aria-hidden="true"
          >
            <div className="navbrand-icon"></div>
          </i>
          <button className="gen-btn ml-3 text-3xl font-medium cursor-pointer hover:text-blue-800">
            GeoLogger
          </button>
        </div>
        <ul className="flex justify-end items-center m-0">
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
        </ul>
      </nav>
    </div>
  );
};

export default AppNavbar;
