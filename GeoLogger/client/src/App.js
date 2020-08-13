import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Container } from 'reactstrap'
import Mapbox from './components/Mapbox'
import Settings from './components/Settings'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Provider } from 'react-redux'
import store from './store/index'

const App = () => {
  return (
    <div>
      <Router>
        <Provider store={store}>
          <Container className='mt-5'>
            <Switch>
              <Route exact path='/' component={Mapbox} />
              <Route exact path='/settings' component={Settings} />
            </Switch>
          </Container>
        </Provider>
      </Router>
    </div>
  );
}

export default App;
