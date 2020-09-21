import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Moment from "react-moment";
import { updateProfile } from "../store/profile";
import "../css/settings.css";
import darkV10 from "../img/dark-v10.png";
import lightV10 from "../img/light-v10.png";
import outdoorsV11 from "../img/outdoors-v11.png";
import streetsV11 from "../img/streets-v11.png";
import satelliteV9 from "../img/satellite-v9.png";

const Settings = () => {
  const dispatch = useDispatch();
  const { profile, loading } = useSelector(state => state.profile);
  const { user } = useSelector(state => state.auth);
  const [saved, setSaved] = useState(false);
  const [theme, setTheme] = useState("");
  const [mapStyle, setMapStyle] = useState("");
  const [fillColor, setFillColor] = useState("");
  const [visited, setVisited] = useState([]);

  useEffect(() => {
    if (!loading) {
      setTheme(profile.theme);
      setMapStyle(profile.mapStyle);
      setFillColor(profile.fillColor);
      setVisited(profile.visited);
    }
  }, [profile]);

  const onSubmit = e => {
    e.preventDefault();

    const profile = {
      theme,
      mapStyle,
      fillColor,
      visited,
    };

    dispatch(updateProfile(profile));

    setSaved(true);

    setTimeout(() => {
      setSaved(true);
    }, 4000);
  };

  return (
    <div className="settings-bg min-h-screen bg-gray-200 flex justify-center items-start pt-32 pr-4 pb-4 pl-4">
      {loading ? (
        <h3 className="text-center text-light">Loading...</h3>
      ) : (
        <div className="max-w-6xl grid grid-cols-5 gap-5">
          {saved && (
            <div className="col-span-5 bg-green-300 rounded-lg p-2">
              <p className="m-0 text-gray-800 text-center">Changes Saved!</p>
            </div>
          )}

          <div className="col-span-5 bg-gray-200 rounded-lg shadow-lg p-3">
            <div className=" flex justify-between">
              <Link
                className="gen-btn back-btn text-gray-900 font-medium px-2 py-1 rounded-lg hover:bg-red-600 hover:text-gray-200 hover:border-transparent"
                to="/map"
              >
                Back to Map
              </Link>
              <button
                className="gen-btn cancel-btn justify-self-end bg-blue-500 text-gray-200 font-medium px-2 py-1 rounded-lg hover:bg-blue-800"
                type="submit"
                form="settings-form"
              >
                Save{" "}
              </button>
            </div>
          </div>

          <div className="col-span-5 bg-gray-200 rounded-lg shadow-lg p-3 text-gray-900 text-center">
            <h2 className="font-semibold">Account Info</h2>
            <h4>{user.username}</h4>
            <h5>{user.email}</h5>
            <p>
              Registered on{" "}
              <Moment format="MMM Do, YYYY hh:mm:ss A">{user.date}</Moment>
            </p>
          </div>

          <div className="col-span-5 bg-gray-200 rounded-lg shadow-lg p-3 text-gray-900 text-center">
            <h2 className="text-center font-semibold">User Settings</h2>
            <h4 className="text-center mb-3">Map Style</h4>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-4">
              <div className="md:col-span-1 sm:col-span-2">
                <label>Dark V10</label>
                <img
                  className="thumbnail"
                  src={darkV10}
                  alt="mapbox dark-v10 theme"
                  onClick={() => setMapStyle("dark-v10")}
                  style={{
                    filter: mapStyle === "dark-v10" && "blur(2px)",
                    transform: mapStyle === "dark-v10" && "scale(1.2)",
                  }}
                />
              </div>
              <div className="md:col-span-1 sm:col-span-2">
                <label>Light V10</label>
                <img
                  className="thumbnail"
                  src={lightV10}
                  alt="mapbox light-v10 theme"
                  onClick={() => setMapStyle("light-v10")}
                  style={{
                    filter: mapStyle === "light-v10" && "blur(2px)",
                    transform: mapStyle === "light-v10" && "scale(1.2)",
                  }}
                />
              </div>
              <div className="md:col-span-1 sm:col-span-2">
                <label>Outdoors V11</label>
                <img
                  className="thumbnail"
                  src={outdoorsV11}
                  alt="mapbox outdoors-v11 theme"
                  onClick={() => setMapStyle("outdoors-v11")}
                  style={{
                    filter: mapStyle === "outdoors-v11" && "blur(2px)",
                    transform: mapStyle === "outdoors-v11" && "scale(1.2)",
                  }}
                />
              </div>
              <div className="md:col-span-1 sm:col-span-2">
                <label>Streets V11</label>
                <img
                  className="thumbnail"
                  src={streetsV11}
                  alt="mapbox streets-v11 theme"
                  onClick={() => setMapStyle("streets-v11")}
                  style={{
                    filter: mapStyle === "streets-v11" && "blur(2px)",
                    transform: mapStyle === "streets-v11" && "scale(1.2)",
                  }}
                />
              </div>
              <div className="md:col-span-1 sm:col-span-2">
                <label>Satellite V9</label>
                <img
                  className="thumbnail"
                  src={satelliteV9}
                  alt="mapbox satellite-v9 theme"
                  onClick={() => setMapStyle("satellite-v9")}
                  style={{
                    filter: mapStyle === "satellite-v9" && "blur(2px)",
                    transform: mapStyle === "satellite-v9" && "scale(1.2)",
                  }}
                />
              </div>
            </div>
            <form
              id="settings-form"
              className="col-span-5 text-center"
              onSubmit={e => onSubmit(e)}
            >
              <div className="mb-5">
                <label className="mt-3">
                  <h4>Region Highlight Color</h4>
                </label>
                <input
                  onChange={e => setFillColor(e.target.value)}
                  type="text"
                  name="fillColor"
                  className="cust-input"
                  placeholder="Color"
                  value={fillColor}
                />
                <p className="mt-2">
                  Click{" "}
                  <a
                    className="std-link"
                    href="https://htmlcolorcodes.com/color-picker/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    here
                  </a>{" "}
                  for hex color codes
                </p>
              </div>
              <div tag="fieldset">
                <h4>Site Theme</h4>
                <div>
                  <label>
                    <input
                      type="radio"
                      name="radio1"
                      onChange={e => setTheme(e.target.value)}
                      checked={theme === "light" ? true : false}
                    />{" "}
                    Light
                  </label>
                </div>
                <div>
                  <label>
                    <input
                      type="radio"
                      name="radio1"
                      onChange={e => setTheme(e.target.value)}
                      checked={theme === "dark" ? true : false}
                    />{" "}
                    Dark
                  </label>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
