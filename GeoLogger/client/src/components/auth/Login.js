import React, { useState } from "react";
import { Redirect, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Form, FormGroup, Label, Input, Alert } from "reactstrap";
import { login } from "../../store/auth";
import { clearAlert } from "../../store/alert";

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

  if (msg)
    setTimeout(() => {
      dispatch(clearAlert());
    }, 4000);

  return (
    <div className="register-div min-h-screen flex justify-center items-start  pt-24 pr-4 pb-4 pl-4">
      <div className="max-w-4xl w-full p-6 bg-gray-300 rounded shadow-lg text-black">
        {msg && (
          <div className="col-span-5 bg-red-300 rounded-lg p-2">
            <p className="m-0 text-gray-800 text-center">{msg}</p>
          </div>
        )}
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
            <button className="gen-btn bg-blue-700 text-gray-200 font-medium py-1 px-3 mr-2 rounded-lg hover:bg-blue-800">
              Login
            </button>
            <Link
              to="/"
              className="gen-btn cancel-btn border border-red-600 text-red-600 font-medium py-1 px-3 rounded-lg hover:bg-red-600 hover:text-gray-200 hover:border-transparent"
            >
              Cancel
            </Link>
          </div>
          <p className="mt-2 mb-0">
            Don't have an account?{" "}
            <Link to="/register" className="std-link">
              Register
            </Link>
          </p>
        </Form>
      </div>
    </div>
  );
};

export default Login;
