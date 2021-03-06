import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { NavItem } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/auth";
import "../../css/navbar.css";

const AppNavbar = () => {
  const dispatch = useDispatch();
  const { isAuth } = useSelector(state => state.auth);
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownActive, setDropdownActive] = useState(false);

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
      <div className="dropdown">
        <button className="nav-link text-gray-400 hover:text-gray-200 pb-1">
          Profile
        </button>
        <div className="dropdown-content">
          <Link to="/settings" className="text-black no-underline">
            Settings
          </Link>
          <a
            className="text-black no-underline"
            onClick={() => dispatch(logout())}
          >
            Logout
          </a>
        </div>
      </div>
    </Fragment>
  );

  return (
    <div className="flex justify-center">
      <nav className="pt-3 pl-4 pr-4 max-w-6xl w-full flex justify-between">
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
