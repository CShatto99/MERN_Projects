import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../../store/profile";
import { clearAlert } from "../../store/alert";
import darkV10 from "../../img/dark-v10.png";
import lightV10 from "../../img/light-v10.png";
import outdoorsV11 from "../../img/outdoors-v11.png";
import streetsV11 from "../../img/streets-v11.png";
import satelliteV9 from "../../img/satellite-v9.png";
import colors from "../../json/colors.json";

const CreateProfile = () => {
  const dispatch = useDispatch();
  const { profile } = useSelector(state => state.profile);
  const { msg } = useSelector(state => state.alert);
  const [mapStyle, setMapStyle] = useState("");
  const [fillColor, setFillColor] = useState("");

  const onSubmit = () => {
    const profile = {
      theme: "dark",
      mapStyle,
      fillColor,
      visited: [],
    };

    dispatch(updateProfile(profile));
  };

  if (msg)
    setTimeout(() => {
      dispatch(clearAlert());
    }, 4000);

  if (JSON.stringify(profile) !== "{}") return <Redirect to="/map" />;

  return (
    <div className="map-div min-h-screen max-w-6xl mx-auto text-center grid grid-cols-1 pt-24 pr-4 pb-4 pl-4">
      <h1>Lets Set Up An Account!</h1>
      <div className="arrow-box">
        <i className="fa fa-long-arrow-up fa-2x mr-24" aria-hidden="true"></i>
        <i className="fa fa-long-arrow-up fa-2x mr-24" aria-hidden="true"></i>
        <i className="fa fa-long-arrow-up fa-2x" aria-hidden="true"></i>
      </div>
      <h1 className="mb-5 font-medium">Choose a Map Style</h1>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-5 text-center">
        <div>
          <img
            className="rounded-lg shadow-lg"
            src={darkV10}
            alt="mapbox dark-v10 theme"
          />
          <input
            type="radio"
            name="radio"
            onChange={() => {
              setMapStyle("dark-v10");
            }}
            checked={mapStyle === "dark-v10" ? true : false}
          />{" "}
          <label>
            <h3 className="mt-2 font-light">Dark V10</h3>
          </label>
        </div>
        <div>
          <img
            className="rounded-lg shadow-lg"
            src={lightV10}
            alt="mapbox light-v10 theme"
          />
          <input
            type="radio"
            name="radio"
            onChange={() => {
              setMapStyle("light-v10");
            }}
            checked={mapStyle === "light-v10" ? true : false}
          />{" "}
          <label>
            <h3 className="mt-2 font-light">Light V10</h3>
          </label>
        </div>
        <div>
          <img
            className="rounded-lg shadow-lg"
            src={outdoorsV11}
            alt="mapbox outdoors-v11 theme"
          />
          <input
            type="radio"
            name="radio"
            onChange={() => {
              setMapStyle("outdoors-v11");
            }}
            checked={mapStyle === "outdoors-v11" ? true : false}
          />{" "}
          <label>
            <h3 className="mt-2 font-light">Outdoors V11</h3>
          </label>
        </div>
        <div>
          <img
            className="rounded-lg shadow-lg"
            src={streetsV11}
            alt="mapbox streets-v11 theme"
          />
          <input
            type="radio"
            name="radio"
            onChange={() => {
              setMapStyle("streets-v11");
            }}
            checked={mapStyle === "streets-v11" ? true : false}
          />{" "}
          <label>
            <h3 className="mt-2 font-light">Streets V11</h3>
          </label>
        </div>
        <div className="md:col-span-2 sm:col-span-1">
          <img
            className="sat-img rounded-lg shadow-lg mx-auto"
            src={satelliteV9}
            alt="mapbox satellite-v9 theme"
          />
          <input
            type="radio"
            name="radio"
            onChange={() => {
              setMapStyle("satellite-v9");
            }}
            checked={mapStyle === "satellite-v9" ? true : false}
          />{" "}
          <label>
            <h3 className="mt-2 font-light">Satellite V9</h3>
          </label>
        </div>
      </div>
      <div className="arrow-box">
        <i className="fa fa-long-arrow-up fa-2x mr-24" aria-hidden="true"></i>
        <i className="fa fa-long-arrow-up fa-2x mr-24" aria-hidden="true"></i>
        <i className="fa fa-long-arrow-up fa-2x" aria-hidden="true"></i>
      </div>

      <div className="flex flex-wrap justify-center text-center">
        <h1 className="mb-4 w-full">Choose A Highlight Color</h1>
        {colors.map(({ name, hex }) => (
          <div
            key={hex}
            className="color-block"
            style={{ backgroundColor: hex }}
            onClick={() => setFillColor(hex)}
          >
            <div className="color-block-label bg-gray-200">{name}</div>
          </div>
        ))}
        <p className="w-full mt-2">
          Not seeing your favorite color? Click{" "}
          <a
            className="std-link"
            href="https://htmlcolorcodes.com/color-picker/"
            target="_blank"
            rel="noopener noreferrer"
          >
            here
          </a>
        </p>
      </div>
      {msg && (
        <div className=" bg-red-300 rounded-lg p-2">
          <p className="m-0 text-gray-800 text-center">{msg}</p>
        </div>
      )}
      <button
        onClick={onSubmit}
        className="gen-btn bg-blue-700 text-gray-200 font-medium mt-5 py-1 px-3 mr-2 rounded-lg hover:bg-blue-800"
      >
        Finish
      </button>
    </div>
  );
};

export default CreateProfile;
