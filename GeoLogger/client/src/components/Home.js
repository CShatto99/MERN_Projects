import React, { useState, useEffect } from "react";
import { Redirect, Link } from "react-router-dom";
import { Container, Button } from "reactstrap";
import { useSelector } from "react-redux";
import Register from "./auth/Register";
import "../css/home.css";
import darkV10 from "../img/dark-v10.png";

const Home = () => {
  const { isAuth } = useSelector(state => state.auth);
  const [isOpen, setIsOpen] = useState(true);
  const [regOpen, setRegOpen] = useState(false);

  useEffect(() => {
    setRegOpen(!regOpen);
  }, []);

  return (
    <>
      <div className="bg-black">
        <div className="max-w-6xl mx-auto flex landing-div">
          <div className="grid grid-cols-2 gap-3 h-full">
            <div className="my-auto">
              <h1>Welcome To GeoLogger</h1>
              <p className="font-light">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Morbi tristique senectus et netus et malesuada fames.
              </p>
              <Link className="btn btn-dark" to="/register">
                Start Logging
              </Link>
            </div>
            <div
              className={
                regOpen
                  ? "register-enter my-auto p-6 bg-gray-300 rounded shadow-xl text-black"
                  : "register-exit my-auto p-6 bg-gray-300 rounded shadow-xl text-black"
              }
            >
              <h2>Lorem ipsum</h2>
              <p className="font-light">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <h2>Lorem ipsum</h2>
              <p className="font-light">
                Ut enim ad minim veniam, quis nostrud exercitation ullamco
                laboris nisi ut aliquip ex ea commodo consequat.{" "}
              </p>
              <a
                href="https://www.mapbox.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="register-btn no-underline bg-blue-700 text-white font-normal py-2 px-3 rounded-lg hover:bg-blue-800">
                  Learn More
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-300">
        <div className="max-w-6xl mx-auto flex landing-div">
          <div className="grid grid-cols-2 gap-3 h-full">
            <div className="my-auto">
              <h1>Welcome To GeoLogger</h1>
              <p className="font-light">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Morbi tristique senectus et netus et malesuada fames.
              </p>
              <Link className="btn btn-dark" to="/register">
                Start Logging
              </Link>
            </div>
            <div
              className={
                regOpen
                  ? "register-enter my-auto p-6 bg-gray-300 rounded shadow-xl text-black"
                  : "register-exit my-auto p-6 bg-gray-300 rounded shadow-xl text-black"
              }
            >
              <h2>Lorem ipsum</h2>
              <p className="font-light">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <h2>Lorem ipsum</h2>
              <p className="font-light">
                Ut enim ad minim veniam, quis nostrud exercitation ullamco
                laboris nisi ut aliquip ex ea commodo consequat.{" "}
              </p>
              <a
                href="https://www.mapbox.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="register-btn no-underline bg-blue-700 text-white font-normal py-2 px-3 rounded-lg hover:bg-blue-800">
                  Learn More
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="grid grid-cols-3 gap-4 text-black mb-5">
        <div className="flex p-6 bg-white rounded-lg shadow-xl">
          <div>1</div>
        </div>
        <div className="flex p-6 bg-white rounded-lg shadow-xl">
          <div>1</div>
        </div>
        <div className="flex p-6 bg-white rounded-lg shadow-xl">
          <div>1</div>
        </div>
        <div className="flex p-6 bg-white rounded-lg shadow-xl">
          <div>1</div>
        </div>
        <div className="flex p-6 bg-white rounded-lg shadow-xl">
          <div>1</div>
        </div>
      </div>
      <div
        className={
          isOpen
            ? "div-enter max-w-sm mx-auto flex p-6 bg-white rounded-lg shadow-xl"
            : "div-exit max-w-sm mx-auto flex p-6 bg-white rounded-lg shadow-xl"
        }
      >
        <div className="flex-shrink-0">
          <img className="h-12 w-12" src={darkV10} alt="test" />
        </div>
        <div className="ml-6 pt-1">
          <h4 className="text-xl text-gray-900 leading-tight">GeoLogger</h4>
          <p className="text-base text-gray-600 leading-none">
            You have a new message!
          </p>
        </div>
      </div>

      <div className="max-w-sm mx-auto">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="mt-3"
          color="primary"
          outline
          block
        >
          Test
        </Button>
      </div> */}
    </>
  );
};

export default Home;
