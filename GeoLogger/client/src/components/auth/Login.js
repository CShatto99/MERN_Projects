import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { login } from "../../store/auth";

const Login = () => {
  const dispatch = useDispatch();
  const { isAuth } = useSelector(state => state.auth);
  const [state, setState] = useState({
    email: "",
    password: "",
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
      email: state.email,
      password: state.password,
    };

    dispatch(login(user));
  };

  if (isAuth) return <Redirect to="/" />;

  return (
    <div className="h-screen register-div p-8">
      <div className="max-w-lg mx-auto mt-5 p-6 bg-gray-300 rounded text-black">
        <h2>Login</h2>
        <Form onSubmit={onSubmit}>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input
              type="text"
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
          <Button color="primary">Login</Button>
        </Form>
      </div>
    </div>
  );
};

export default Login;
