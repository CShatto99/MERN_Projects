import React, { useState } from "react";
import { Redirect, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Form, FormGroup, Label, Input, Alert } from "reactstrap";
import { login } from "../../store/auth";

const Login = () => {
  const dispatch = useDispatch();
  const { isAuth } = useSelector(state => state.auth);
  const { msg } = useSelector(state => state.alert);
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

  if (isAuth) return <Redirect to="/map" />;

  return (
    <div className="register-div min-h-screen flex justify-center items-start p-5">
      <div className="mt-5 max-w-4xl w-full p-6 bg-gray-300 rounded shadow-lg text-black">
        {msg && <Alert color="danger">{msg}</Alert>}
        <div className="flex justify-between items-center">
          <h2>Login</h2>
          <p className="float-right text-red-600 text-base m-0">* required</p>
        </div>
        <Form onSubmit={onSubmit}>
          <FormGroup>
            <Label for="email">
              Email<span className="text-red-600"> *</span>
            </Label>
            <Input
              type="text"
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
          <div className="flex items-center">
            <button className="gen-btn bg-blue-700 text-white font-medium py-1 px-3 mr-2 rounded-lg hover:bg-blue-800">
              Login
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

export default Login;
