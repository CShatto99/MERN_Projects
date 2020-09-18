import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ModalBody, ListGroup, Button } from "reactstrap";
//import { useSelector } from "react-redux";
import "../css/home.css";
import usa from "../json/US.json";
import darkV10 from "../img/dark-v10.png";
import lightV10 from "../img/light-v10.png";
import outdoorsV11 from "../img/outdoors-v11.png";
import streetsV11 from "../img/streets-v11.png";
import satelliteV9 from "../img/satellite-v9.png";
import vacaEx from "../img/vaca-ex.png";

let modalDemo = [];

for (let i = 0; i < 10; i++) {
  modalDemo.push(
    <Button
      key={usa[i].name}
      id={usa[i].name}
      className="text-left"
      color="light"
      block
    >
      {usa[i].name}
      {Math.random() > 0.6 ? (
        <span className="float-right text-success">VISITED</span>
      ) : (
        ""
      )}
    </Button>
  );
}

const Home = () => {
  //const { isAuth } = useSelector(state => state.auth);
  const [landingDiv, setLandingDiv] = useState(false);
  //const [regOpen, setRegOpen] = useState(false);

  useEffect(() => {
    setLandingDiv(!landingDiv);
  }, []);

  return (
    <>
      <div className="landing-div flex justify-center items-center min-h-screen bg-black">
        <div
          className={
            landingDiv
              ? "div-enter max-w-6xl p-5 text-center mb-24"
              : "div-exit max-w-6xl p-5 text-center mb-24"
          }
        >
          <h1 className="font-medium">Welcome To GeoLogger</h1>
          <p className="font-light mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Morbi
            tristique senectus et netus et malesuada fames.
          </p>
          <Link
            className="gen-btn bg-blue-700 text-white font-normal py-2 px-3 rounded-full hover:bg-blue-800"
            to="/register"
          >
            Start Logging
          </Link>
        </div>
      </div>

      <div className="map-div min-h-screen bg-gray-200">
        <div className="max-w-6xl mx-auto text-center text-black p-5">
          <h1 className="mb-5 font-medium">Choose a Map Style</h1>
          <div className="grid md:grid-cols-2 grid-cols-1 gap-5 h-full text-black">
            <div>
              <img
                className="rounded-lg shadow-lg"
                src={darkV10}
                alt="mapbox dark-v10 theme"
              />
              <h3 className="mt-2 font-light">Dark V10</h3>
            </div>
            <div>
              <img
                className="rounded-lg shadow-lg"
                src={lightV10}
                alt="mapbox light-v10 theme"
              />
              <h3 className="mt-2 font-light">Light V10</h3>
            </div>
            <div>
              <img
                className="rounded-lg shadow-lg"
                src={outdoorsV11}
                alt="mapbox outdoors-v11 theme"
              />
              <h3 className="mt-2 font-light">Outdoors V11</h3>
            </div>
            <div>
              <img
                className="rounded-lg shadow-lg"
                src={streetsV11}
                alt="mapbox streets-v11 theme"
              />
              <h3 className="mt-2 font-light">Streets V11</h3>
            </div>
            <div className="md:col-span-2 sm:col-span-1">
              <img
                className="sat-img rounded-lg shadow-lg mx-auto"
                src={satelliteV9}
                alt="mapbox satellite-v9 theme"
              />
              <h3 className="mt-2 font-light">Satellite V9</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="vaca-history-div">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-5 p-5">
          <h1 className="col-span-1 md:col-span-2 sm:text-center md:text-right">
            Log Your Vacation History
          </h1>
          <div className="text-center my-auto">
            <img
              className="rounded-lg shadow-lg"
              src={vacaEx}
              alt="mapbox outdoors-v11 theme"
            />
          </div>
          <div className="bg-gray-300 rounded-lg my-auto">
            <ModalBody>
              <ListGroup>{modalDemo}</ListGroup>
            </ModalBody>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
