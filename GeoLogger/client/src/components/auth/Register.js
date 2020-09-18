import React, { useState } from "react";
import { Redirect, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Form, FormGroup, Label, Input } from "reactstrap";
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

  if (isAuth) return <Redirect to="/map" />;

  return (
    <div className="register-div min-h-screen flex justify-center items-start p-5">
      <div className="mt-5 max-w-4xl w-full p-6 bg-gray-300 rounded shadow-lg text-black">
        <div className="flex justify-between items-center">
          <h2>Register</h2>
          <p className="float-right text-red-600 text-base m-0">* required</p>
        </div>
        <Form onSubmit={onSubmit}>
          <FormGroup>
            <Label for="username">
              Username<span className="text-red-600"> *</span>
            </Label>
            <Input
              type="text"
              id="username"
              name="username"
              onChange={e => onChange(e)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="email">
              Email<span className="text-red-600"> *</span>
            </Label>
            <Input
              type="email"
              id="email"
              name="email"
              onChange={e => onChange(e)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="password">
              Password<span className="text-red-600"> *</span>
            </Label>
            <Input
              type="password"
              id="password"
              name="password"
              onChange={e => onChange(e)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="passVerify">
              Verify Password<span className="text-red-600"> *</span>
            </Label>
            <Input
              type="password"
              id="passVerify"
              name="passVerify"
              onChange={e => onChange(e)}
            />
          </FormGroup>
          <div className="flex items-center">
            <button className="gen-btn bg-blue-700 text-white font-medium py-1 px-3 mr-2 rounded-lg hover:bg-blue-800">
              Register
            </button>
            <Link
              to="/"
              className="gen-btn cancel-btn border border-red-600 text-red-600 font-medium py-1 px-3 rounded-lg hover:bg-red-600 hover:text-white hover:border-transparent"
            >
              Cancel
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Register;
