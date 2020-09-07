import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { login } from "../../store/auth";

const Login = () => {
  const dispatch = useDispatch();
  const { isAuth } = useSelector((state) => state.auth);
  const [state, setState] = useState({
    userOrEmail: "",
    password: "",
  });

  const onChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const user = {
      userOrEmail: state.userOrEmail,
      password: state.password,
    };

    dispatch(login(user));
  };

  if (isAuth) return <Redirect to="/" />;

  return (
    <div>
      <Form onSubmit={onSubmit}>
        <FormGroup>
          <Label for="userOrEmail">Username or Email</Label>
          <Input
            type="text"
            id="userOrEmail"
            name="userOrEmail"
            onChange={(e) => onChange(e)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="password">Password</Label>
          <Input
            type="password"
            id="password"
            name="password"
            onChange={(e) => onChange(e)}
          />
        </FormGroup>
        <Button color="primary">Login</Button>
      </Form>
    </div>
  );
};

export default Login;
