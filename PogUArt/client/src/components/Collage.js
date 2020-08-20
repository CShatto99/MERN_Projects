import React, { Fragment } from 'react'
import {
  Container,
  Row,
  Col
} from 'reactstrap'
import images from '../json/images.json'

const Collage = () => {
  const { art } = images

  const collage = []
  
  for(let i = 0; i < art.length; i+=2) {
    if(i + 2 <art.length) {
      collage.push(
        <Row key={art[i].title} className='align-items-center mb-5'>
          <Col><img src={require(`../xqcow/${art[i].title}`)} alt="PogU Art" /></Col>
          <Col><img src={require(`../xqcow/${art[i+1].title}`)} alt="PogU Art" /></Col>
        </Row>
      )
    }
    else {
      collage.push(
        <Row key={art[i].title} className='align-items-center mb-5'>
          <Col><img src={require(`../xqcow/${art[i].title}`)} alt="PogU Art" /></Col>
          <Col></Col>
        </Row>
      )
    }
  }

  return (
    <Fragment>
      <Container className='text-center'>
        { collage }
      </Container>
    </Fragment>
  )
}

export default Collage
