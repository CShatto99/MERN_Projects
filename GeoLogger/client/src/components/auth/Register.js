import React, { useState } from "react";
import { Redirect, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Form, FormGroup, Label, Input, Container } from "reactstrap";
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
    <div className="register-div p-8">
      <div className="max-w-lg mx-auto mt-5 p-6 bg-gray-300 rounded text-black">
        <h2>Register</h2>
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
          <button className="register-btn bg-blue-700 text-white font-normal py-2 px-3 mr-2 rounded-lg hover:bg-blue-800">
            Register
          </button>

          <Link to="/">
            <button className="register-btn bg-gray-800 text-white font-normal py-2 px-3 rounded-lg hover:bg-blue-800">
              Go Back
            </button>
          </Link>
        </Form>
      </div>
    </div>
  );
};

export default Register;
