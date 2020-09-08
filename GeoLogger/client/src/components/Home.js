import React from "react";
import { Redirect } from 'react-router-dom'
import { useSelector } from "react-redux";

const Home = () => {
  const { isAuth } = useSelector(state => state.auth);

  // if(isAuth)
  //   return <Redirect to='/map' />

  return <div>HOME PAGE</div>;
};

export default Home;
