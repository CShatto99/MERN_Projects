import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Container } from 'reactstrap'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppNavbar from './components/AppNavbar'
import NoteList from './components/NoteList'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import store from './store'
import { Provider } from 'react-redux'

const App = () => {
  return (
    <div className="App">
      <Router>
        <Provider store={store}>
          <AppNavbar />
          <Container>
            <Switch>
              <Route exact path='/' component={NoteList} />
              <Route exact path='/register' component={Register} />
              <Route exact path='/login' component={Login} />
            </Switch>
          </Container>
        </Provider>
      </Router>

    </div>
  );
}

export default App;
