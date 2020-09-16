import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Form, FormGroup, Label, Input } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/auth";

const Footer = () => {
  const dispatch = useDispatch();
  const { isAuth } = useSelector(state => state.auth);

  const onChange = () => {};

  const onSubmit = () => {};

  const guestLinks = (
    <>
      <div>
        <Link
          to="/login"
          className="nav-link footer-link-hover text-gray-800 hover:text-gray-600"
        >
          Login
        </Link>
        <div className="footer-link-highlight" />
      </div>
      <div>
        <Link
          to="/register"
          className="nav-link footer-link-hover text-gray-800 hover:text-gray-600"
        >
          Register
        </Link>
        <div className="footer-link-highlight" />
      </div>
    </>
  );

  const authLinks = (
    <>
      <div>
        <Link
          to="/map"
          className="nav-link footer-link-hover text-gray-800 hover:text-gray-600"
        >
          Map
        </Link>
        <div className="footer-link-highlight" />
      </div>
      <div>
        <Link
          to="/settings"
          className="nav-link footer-link-hover text-gray-800 hover:text-gray-600"
        >
          Settings
        </Link>
        <div className="footer-link-highlight" />
      </div>
      <div>
        <button
          onClick={() => dispatch(logout())}
          className="nav-link footer-link-hover text-gray-800 hover:text-gray-600"
        >
          Logout
        </button>
        <div className="footer-link-highlight" />
      </div>
    </>
  );

  return (
    <div>
      <footer>
        <div className="bg-gray-300">
          <div className="max-w-6xl mx-auto grid grid-cols-3 gap-10 text-center text-black p-5">
            <div>
              <h2>About</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Morbi tristique senectus et netus et malesuada fames.
              </p>
            </div>
            <div>
              <h2>Site Links</h2>
              <div>
                <Link
                  to="/"
                  className="nav-link footer-link-hover text-gray-800 hover:text-gray-600"
                >
                  Home
                </Link>
                <div className="footer-link-highlight" />
              </div>
              {isAuth ? authLinks : guestLinks}
            </div>
            <div className="text-center">
              <h2>Contact</h2>
              <Form onSubmit={onSubmit}>
                <FormGroup>
                  {/* <Label for="email">Email</Label> */}
                  <Input
                    type="text"
                    id="email"
                    name="email"
                    placeholder="Email"
                    onChange={e => onChange(e)}
                  />
                </FormGroup>
                <FormGroup>
                  {/* <Label for="message">Message</Label> */}
                  <Input
                    type="textarea"
                    id="message"
                    name="message"
                    placeholder="Message"
                    onChange={e => onChange(e)}
                  />
                </FormGroup>
                <div className="flex justify-center items-center">
                  <button className="gen-btn bg-blue-700 text-white font-medium py-1 px-3 mr-2 rounded-lg hover:bg-blue-800">
                    Send
                  </button>
                </div>
              </Form>
            </div>
            <div>
              <small>
                &copy; Copyright {`${new Date().getFullYear()}`}, GeoLogger
              </small>
            </div>
            <div>
              <small>
                Made with{" "}
                <a
                  className="hover:no-underline"
                  href="https://www.mapbox.com/"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  MapBox
                </a>
              </small>
            </div>
            <div>
              <a
                className="text-black"
                href="https://www.mapbox.com/"
                target="_blank"
                rel="noreferrer noopener"
              >
                <i class="fa fa-github fa-2x" aria-hidden="true"></i>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
