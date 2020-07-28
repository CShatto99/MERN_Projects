import React from 'react';
import AppNavbar from './components/Navbar'
import CountDownTimer from './components/CountDownTimer'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import store from './store'
import { Provider } from 'react-redux'
import { Container } from 'reactstrap'

function App() {
  return (
    <Provider store={store}>
      <div>
      <AppNavbar />
        <Container>
          <CountDownTimer />
        </Container>
      </div>
    </Provider>
  );
}

export default App;
