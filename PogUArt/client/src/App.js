import React from 'react'
import { Container } from 'reactstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import Collage from './components/Collage'

const App = () => {
  return (
    <Container className='mt-5'>
      <h2 className='text-center mb-5'>PogU Art</h2>
      <Collage />
    </Container>
  )
}

export default App
