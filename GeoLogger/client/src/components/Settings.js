import React, { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import { updateProfile, updateFill } from "../store/profile";

const Settings = () => {
  const dispatch = useDispatch();
  const { profile, loading } = useSelector(state => state.profile);
  const [state, setState] = useState({
    saved: false,
    fillColor: "",
  });

  useEffect(() => {
    setState({
      ...state,
      theme: profile.theme,
      fillColor: profile.fillColor,
    });
  }, [profile]);

  const onChange = e => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const toggle = () => {
    setState({
      ...state,
      isOpen: !state.isOpen,
    });
  };

  const onSubmit = e => {
    e.preventDefault();

    const profile = {
      theme: state.theme,
      fillColor: state.fillColor,
      visited: profile.visited,
    };

    dispatch(updateProfile(profile));

    setState({
      ...state,
      saved: true,
    });
  };

  return (
    <Container>
      {loading ? (
        <h3 className="text-center text-light">Loading...</h3>
      ) : (
        <Fragment>
          <Row className="justify-content-center mb-1">
            {state.saved && <p className="text-success">Changes Saved!</p>}
          </Row>
          <Row className="justify-content-start mb-3 ml-1">
            <Button color="dark" href="/">
              Go Back
            </Button>
          </Row>
          <hr style={{ backgroundColor: "#fff" }} />
          <Form
            className="justify-content-start ml-1"
            onSubmit={e => onSubmit(e)}
          >
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
                value={profile.fillColor}
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
          </Form>
          <hr style={{ backgroundColor: "#fff" }} />
          <Button formAction={e => onSubmit(e)} color="dark">Save </Button>
        </Fragment>
      )}
    </Container>
  );
};

export default Settings;
