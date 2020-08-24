import React, { Fragment, useState, useEffect } from 'react'
import {
  Container,
  Row,
  Col,
  Button
} from 'reactstrap'
import { v4 as uuidv4 } from 'uuid';
import images from '../json/images.json'
import authors from '../json/authors.json'

const Collage = () => {
  const [state, setState] = useState({
    collage: []
  })

  useEffect(() => {
    onClickHandler()
  }, [])

  const { art } = images

  const loadMore = index => {
    let collage = []
    let i = index
    while(i < index+20) {
      if(i + 2 <= art.length) {
        collage.push(
          <Fragment key={uuidv4()}>
            <Row className='not-mobile align-items-center mb-5'>
              <Col className='mr-5'>
                <img src={art[i].url} alt='PogU Art' />
              </Col>
              <Col>
                <img src={art[i+1].url} alt='PogU Art' />
              </Col>
            </Row>
            <Row className='mobile-div align-items-center mb-5'>
              <Col>
                <img className='mb-5 ' src={art[i].url} alt='PogU Art' />
                <img src={art[i+1].url} alt='PogU Art' />
              </Col>
            </Row>
          </Fragment>
        )
        i+=2
      }
      else {
        collage.push(
          <Fragment>
            <Row className='not-mobile align-items-center mb-5'>
              <Col className='mobile-margin'>
                <img src={art[i].url} alt='PogU Art' />
              </Col>
              <Col></Col>
            </Row>
          </Fragment>
        )
        i++
        break
      }
    }
    return collage
  }

  const onClickHandler = () => {
    setState({
      ...state,
      collage: state.collage.concat(loadMore(state.collage.length*2))
    })
  }

  return (
    <Fragment>
      <Container className='text-center'>
        <h1 className='mobile-header1'>PogU Art</h1>
        <h4 className='mobile-header4 mb-5'>{art.length} pieces by {authors.authors.length} authors</h4>
        {state.collage.length > 0 && state.collage}
        {state.collage.length*2 < art.length && <Button className='mb-5' size='sm' color='primary' onClick={() => onClickHandler()}>Load More</Button>}
      </Container>
    </Fragment>
  )
}

export default Collage
