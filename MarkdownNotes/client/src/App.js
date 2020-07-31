import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Container } from 'reactstrap'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppNavbar from './components/AppNavbar'
import NoteList from './components/note/NoteList'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import Hero from './components/Hero'
import store from './store'
import { Provider } from 'react-redux'
import { loadUser } from './store/auth'

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser())
  })

  return (
    <div className="App">
      <Router>
        <Provider store={store}>
          <AppNavbar />
          <Container>
            <Switch>
              <Route exact path='/home' component={NoteList} />
              <Route exact path='/register' component={Register} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/' component={Hero} />
            </Switch>
          </Container>
        </Provider>
      </Router>

    </div>
  );
}

export default App;
