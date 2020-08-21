import React from 'react'
import { Container } from 'reactstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import AppNavbar from './components/AppNavbar'
import Collage from './components/Collage'

const App = () => {
  return (
    <div>
      <AppNavbar />
      <Container className='mt-3'>

        <Collage />
      </Container>
    </div>
  )
}

export default App
