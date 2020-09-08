import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { register } from "../../store/auth";

const Register = () => {
  const dispatch = useDispatch();
  const { isAuth } = useSelector(state => state.auth);
  const [state, setState] = useState({
    username: "",
    email: "",
    password: "",
    passVerify: "",
  });

  const onChange = e => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = e => {
    e.preventDefault();

    const user = {
      username: state.username,
      email: state.email,
      password: state.password,
      passVerify: state.passVerify,
    };

    dispatch(register(user));
  };

  if (isAuth) return <Redirect to="/" />;

  return (
    <div>
      <Form onSubmit={onSubmit}>
        <FormGroup>
          <Label for="username">Username</Label>
          <Input
            type="text"
            id="username"
            name="username"
            onChange={e => onChange(e)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input
            type="email"
            id="email"
            name="email"
            onChange={e => onChange(e)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="password">Password</Label>
          <Input
            type="password"
            id="password"
            name="password"
            onChange={e => onChange(e)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="passVerify">Verify Password</Label>
          <Input
            type="password"
            id="passVerify"
            name="passVerify"
            onChange={e => onChange(e)}
          />
        </FormGroup>
        <Button color="primary">Register</Button>
      </Form>
    </div>
  );
};

export default Register;
