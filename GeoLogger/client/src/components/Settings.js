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
import { updateFill } from "../store/profile";

const Settings = () => {
  const dispatch = useDispatch();
  const { fillColor, loading } = useSelector((state) => state.profile);
  const [state, setState] = useState({
    saved: false,
    fillColor: "",
  });

  useEffect(() => {
    setState({
      ...state,
      fillColor: fillColor,
    });
  }, [fillColor]);

  const onChange = (e) => {
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

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(updateFill("5f34ca4308e75a1e04e37618", state.fillColor));

    setState({
      ...state,
      saved: true,
    });
  };

  return (
    <Container className="text-center">
      {loading ? (
        <h3 className="text-center text-light">Loading...</h3>
      ) : (
        <Fragment>
          <Row className="justify-content-center mb-1">
            {state.saved && <p className="text-success">Changes Saved!</p>}
          </Row>
          <Row className="justify-content-center mb-3">
            <Button color="dark" href="/">
              Go Back
            </Button>
          </Row>
          <hr style={{ backgroundColor: "#fff" }} />
          <Row className="justify-content-center">
            <Form onSubmit={(e) => onSubmit(e)}>
              <FormGroup>
                <Label className="text-light" for="fillColor">
                  <h3>Region Highlight Color</h3>
                </Label>
                <Input
                  onChange={(e) => onChange(e)}
                  type="text"
                  id="fillColor"
                  name="fillColor"
                  placeholder="Color"
                  value={state.fillColor}
                />
              </FormGroup>
              <Button color="dark" block>
                Save{" "}
              </Button>
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
            </Form>
          </Row>
          <hr style={{ backgroundColor: "#fff" }} />
        </Fragment>
      )}
    </Container>
  );
};

export default Settings;
