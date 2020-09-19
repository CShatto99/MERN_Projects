import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Button, Form, FormGroup, Label, Input } from "reactstrap";
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
  const [state, setState] = useState({
    saved: false,
    thumbnail: false,
    theme: "",
    mapStyle: "",
    fillColor: "",
    visited: [],
  });

  useEffect(() => {
    if (!loading)
      setState({
        ...state,
        theme: profile.theme,
        mapStyle: profile.mapStyle,
        fillColor: profile.fillColor,
        visited: profile.visited,
      });
  }, [profile]);

  const onChange = e => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = e => {
    e.preventDefault();

    const profile = {
      theme: state.theme,
      mapStyle: state.mapStyle,
      fillColor: state.fillColor,
      visited: state.visited,
    };

    dispatch(updateProfile(profile));

    setState({
      ...state,
      saved: true,
    });

    setTimeout(() => {
      setState({
        ...state,
        saved: false,
      });
    }, 4000);
  };

  console.log(state.mapStyle);

  return (
    <div className="min-h-screen flex justify-center items-start pt-24 pr-4 pb-4 pl-4">
      {loading ? (
        <h3 className="text-center text-light">Loading...</h3>
      ) : (
        <div className="max-w-6xl grid grid-cols-5 gap-5">
          {state.saved && (
            <div className="col-span-5 bg-green-300 rounded-lg p-2">
              <p className="m-0 text-gray-800 text-center">Changes Saved!</p>
            </div>
          )}

          <div className="col-span-5 bg-gray-200 rounded-lg p-3">
            <div className=" flex justify-between">
              <Link
                className="gen-btn back-btn text-gray-900 font-medium px-2 py-1 rounded-lg hover:bg-red-600 hover:text-gray-200 hover:border-transparent"
                to="/map"
              >
                Back to Map
              </Link>

              <button
                className="gen-btn cancel-btn justify-self-end bg-blue-700 text-gray-200 font-medium px-2 py-1 rounded-lg hover:bg-blue-800"
                type="submit"
                form="settings-form"
              >
                Save{" "}
              </button>
            </div>
          </div>
          <div className="col-span-5 bg-gray-200 rounded-lg p-3 text-gray-900 text-center">
            <h2 className="font-semibold">Account Info</h2>
            <h4>{user.username}</h4>
            <h5>{user.email}</h5>
            <p>
              Registered on{" "}
              <Moment format="MMM Do, YYYY hh:mm:ss A">{user.date}</Moment>
            </p>
          </div>

          <div className="col-span-5 bg-gray-200 rounded-lg p-3 text-gray-900">
            <h2 className="text-center font-semibold">User Settings</h2>
            <h4 className="text-center mb-3">Map Style</h4>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-4">
              <div className="md:col-span-1 sm:col-span-2">
                <input
                  type="radio"
                  name="radio"
                  onChange={() => {
                    setState({
                      ...state,
                      mapStyle: "dark-v10",
                    });
                  }}
                  checked={state.mapStyle === "dark-v10" ? true : false}
                />{" "}
                <label>Dark</label>
                <a
                  className="std-link float-right"
                  href="https://www.mapbox.com/maps/dark"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Demo
                </a>
                <img
                  className="thumbnail"
                  src={darkV10}
                  alt="mapbox dark-v10 theme"
                />
              </div>
              <div className="md:col-span-1 sm:col-span-2">
                <input
                  type="radio"
                  name="radio"
                  onChange={() => {
                    setState({
                      ...state,
                      mapStyle: "light-v10",
                    });
                  }}
                  checked={state.mapStyle === "light-v10" ? true : false}
                />{" "}
                <label>Light</label>
                <a
                  className="std-link float-right"
                  href="https://www.mapbox.com/maps/light"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Demo
                </a>{" "}
                <img
                  className="thumbnail"
                  src={lightV10}
                  alt="mapbox light-v10 theme"
                />
              </div>
              <div className="md:col-span-1 sm:col-span-2">
                <input
                  type="radio"
                  name="radio"
                  onChange={() => {
                    setState({
                      ...state,
                      mapStyle: "outdoors-v11",
                    });
                  }}
                  checked={state.mapStyle === "outdoors-v11" ? true : false}
                />{" "}
                <label>Outdoors</label>
                <a
                  className="std-link float-right"
                  href="https://www.mapbox.com/maps/streets"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Demo
                </a>
                <img
                  className="thumbnail"
                  src={outdoorsV11}
                  alt="mapbox outdoors-v11 theme"
                />
              </div>
              <div className="md:col-span-1 sm:col-span-2">
                <input
                  type="radio"
                  name="radio"
                  onChange={() => {
                    setState({
                      ...state,
                      mapStyle: "streets-v11",
                    });
                  }}
                  checked={state.mapStyle === "streets-v11" ? true : false}
                />{" "}
                <label>Streets</label>
                <a
                  className="std-link float-right"
                  href="https://www.mapbox.com/maps/outdoors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Demo
                </a>
                <img
                  className="thumbnail"
                  src={streetsV11}
                  alt="mapbox streets-v11 theme"
                />
              </div>
              <div className="md:col-span-1 sm:col-span-2">
                <input
                  type="radio"
                  name="radio"
                  onChange={() => {
                    setState({
                      ...state,
                      mapStyle: "satellite-v9",
                    });
                  }}
                  checked={state.mapStyle === "satellite-v9" ? true : false}
                />{" "}
                <label>Satellite</label>
                <a
                  className="std-link float-right"
                  href="https://www.mapbox.com/maps/satellite"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Demo
                </a>
                <img
                  className="thumbnail"
                  src={satelliteV9}
                  alt="mapbox satellite-v9 theme"
                />
              </div>
            </div>
            <Form
              id="settings-form"
              className="col-span-5 text-center"
              onSubmit={e => onSubmit(e)}
            >
              <FormGroup className="mb-5">
                <Label className="mt-3" for="fillColor">
                  <h4>Region Highlight Color</h4>
                </Label>
                <Input
                  onChange={e => onChange(e)}
                  type="text"
                  id="fillColor"
                  name="fillColor"
                  placeholder="Color"
                  value={state.fillColor}
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
              </FormGroup>
              <FormGroup tag="fieldset">
                <h4>Site Theme</h4>
                <FormGroup check>
                  <Label check>
                    <Input
                      type="radio"
                      name="radio1"
                      onChange={() => {
                        setState({
                          ...state,
                          theme: "light",
                        });
                      }}
                      checked={state.theme === "light" ? true : false}
                    />{" "}
                    Light
                  </Label>
                </FormGroup>
                <FormGroup check>
                  <Label check>
                    <Input
                      type="radio"
                      name="radio1"
                      onChange={() => {
                        setState({
                          ...state,
                          theme: "dark",
                        });
                      }}
                      checked={state.theme === "dark" ? true : false}
                    />{" "}
                    Dark
                  </Label>
                </FormGroup>
              </FormGroup>
            </Form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
