import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Container } from "reactstrap";
import AppNavbar from "./components/layout/AppNavbar";
import Register from "./components/auth/Register"
import Login from "./components/auth/Login"
import Mapbox from "./components/Mapbox";
import Settings from "./components/Settings";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Provider } from "react-redux";
import store from "./store/index";
import { loadProfile } from "./store/profile";

const App = () => {
  useEffect(() => {
    store.dispatch(loadProfile("5f34ca4308e75a1e04e37618"));
  });

  return (
    <div>
      <Router>
        <Provider store={store}>
          <AppNavbar />
          <Container className="mt-5">
            <Switch>
              <Route exact path='/register' component={Register} />
              <Route exact path='/login' component={Login} />
              <Route exact path="/" component={Mapbox} />
              <Route exact path="/settings" component={Settings} />
            </Switch>
          </Container>
        </Provider>
      </Router>
    </div>
  );
};

export default App;
