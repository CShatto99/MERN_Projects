import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Button, Form, FormGroup, Label, Input } from "reactstrap";
import Moment from "react-moment";
import { updateProfile, updateFill } from "../store/profile";
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

  return (
    <>
      {loading ? (
        <h3 className="text-center text-light">Loading...</h3>
      ) : (
        <Fragment>
          <Row className="justify-content-center mb-1">
            {state.saved && <p className="text-success">Changes Saved!</p>}
          </Row>
          <Row className="mb-3">
            <Col>
              <h2>Account Info</h2>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col className="ml-3">
              <h4>{user.username}</h4>
              <h5>{user.email}</h5>
              <p>
                Registered on{" "}
                <Moment format="MMM Do, YYYY hh:mm:ss A">{user.date}</Moment>
              </p>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <Link className="btn btn-outline-dark text-light" to="/map">
                Back to Map
              </Link>
            </Col>
            <Col>
              <Button
                className="float-right text-light"
                type="submit"
                form="settings-form"
                color="success"
                outline
              >
                Save{" "}
              </Button>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <h2>User Settings</h2>
            </Col>
          </Row>
          <FormGroup tag="fieldset">
            <h4>Map Style</h4>
            <Row>
              <Col>
                <FormGroup check>
                  <Label check>
                    <Input
                      type="radio"
                      name="radio1"
                      onChange={() => {
                        setState({
                          ...state,
                          mapStyle: "dark-v10",
                        });
                      }}
                      checked={state.mapStyle === "dark-v10" ? true : false}
                    />{" "}
                    Dark
                  </Label>
                  <a
                    className="std-link float-right"
                    href="https://www.mapbox.com/maps/dark"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Demo
                  </a>
                </FormGroup>
                <img
                  className="thumbnail"
                  src={darkV10}
                  alt="mapbox dark-v10 theme"
                />
              </Col>
              <Col>
                <FormGroup check>
                  <Label check>
                    <Input
                      type="radio"
                      name="radio1"
                      onChange={() => {
                        setState({
                          ...state,
                          mapStyle: "light-v10",
                        });
                      }}
                      checked={state.mapStyle === "light-v10" ? true : false}
                    />{" "}
                    Light
                  </Label>
                  <a
                    className="std-link float-right"
                    href="https://www.mapbox.com/maps/light"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Demo
                  </a>
                </FormGroup>
                <img
                  className="thumbnail"
                  src={lightV10}
                  alt="mapbox light-v10 theme"
                />
              </Col>
              <Col>
                <FormGroup check>
                  <Label check>
                    <Input
                      type="radio"
                      name="radio1"
                      onChange={() => {
                        setState({
                          ...state,
                          mapStyle: "outdoors-v11",
                        });
                      }}
                      checked={state.mapStyle === "outdoors-v11" ? true : false}
                    />{" "}
                    Outdoors
                  </Label>
                  <a
                    className="std-link float-right"
                    href="https://www.mapbox.com/maps/streets"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Demo
                  </a>
                </FormGroup>
                <img
                  className="thumbnail"
                  src={outdoorsV11}
                  alt="mapbox outdoors-v11 theme"
                />
              </Col>
              <Col>
                <FormGroup check>
                  <Label check>
                    <Input
                      type="radio"
                      name="radio1"
                      onChange={() => {
                        setState({
                          ...state,
                          mapStyle: "streets-v11",
                        });
                      }}
                      checked={state.mapStyle === "streets-v11" ? true : false}
                    />{" "}
                    Streets
                  </Label>
                  <a
                    className="std-link float-right"
                    href="https://www.mapbox.com/maps/outdoors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Demo
                  </a>
                </FormGroup>
                <img
                  className="thumbnail"
                  src={streetsV11}
                  alt="mapbox streets-v11 theme"
                />
              </Col>
              <Col>
                <FormGroup check>
                  <Label check>
                    <Input
                      type="radio"
                      name="radio1"
                      onChange={() => {
                        setState({
                          ...state,
                          mapStyle: "satellite-v9",
                        });
                      }}
                      checked={state.mapStyle === "satellite-v9" ? true : false}
                    />{" "}
                    Satellite
                  </Label>
                  <a
                    className="std-link float-right"
                    href="https://www.mapbox.com/maps/satellite"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Demo
                  </a>
                </FormGroup>
                <img
                  className="thumbnail"
                  src={satelliteV9}
                  alt="mapbox satellite-v9 theme"
                />
              </Col>
            </Row>
          </FormGroup>
          <Form id="settings-form" onSubmit={e => onSubmit(e)}>
            <hr style={{ backgroundColor: "#fff" }} />
            <FormGroup>
              <Label className="justify-content-start" for="fillColor">
                <h4 className="text-left">Region Highlight Color</h4>
              </Label>
              <Input
                onChange={e => onChange(e)}
                type="text"
                id="fillColor"
                name="fillColor"
                placeholder="Color"
                value={state.fillColor}
              />
              <p className="text-light mt-2">
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
            <hr style={{ backgroundColor: "#fff" }} />
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
            <hr style={{ backgroundColor: "#fff" }} />
          </Form>
        </Fragment>
      )}
    </>
  );
};

export default Settings;
