import React from 'react'
import { Container } from 'reactstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import AppNavbar from './components/AppNavbar'
import Collage from './components/Collage'
import { Provider } from 'react-redux'
import store from './store'

const App = () => {
  return (
    <Provider store={store}>
      <div>
        <AppNavbar />
        <Container className='mt-3'>

          <Collage />
        </Container>
      </div>
    </Provider>
  )
}

export default App
