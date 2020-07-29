import React from 'react';
import AppNavbar from './components/Navbar'
import EventModal from './components/EventModal'
import CountDownTimer from './components/CountDownTimer'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import store from './store'
import { Provider} from 'react-redux'
import { Container } from 'reactstrap'

const App = () => {
  return (
    <Provider store={store}>
      <div className='app'>
      <AppNavbar />
        <Container>

          <CountDownTimer />
        </Container>
      </div>
    </Provider>
  );
}

export default App;
