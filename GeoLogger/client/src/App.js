import React from 'react';
import { Container } from 'reactstrap'
import Mapbox from './components/Mapbox'
import Checklist from './components/Checklist'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Provider } from 'react-redux'
import store from './store/index'

const App = () => {
  return (
    <Provider store={store}>
      <div>
        <Container>
          <Mapbox />
        </Container>
      </div>
    </Provider>
  );
}

export default App;
