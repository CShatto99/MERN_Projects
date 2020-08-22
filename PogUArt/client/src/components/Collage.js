import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Container,
  Row,
  Col,
  Spinner
} from 'reactstrap'
import { getImages } from '../store/image'

const Collage = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getImages())
  }, [dispatch])
  const { images, loading } = useSelector(state => state.image)

  const base64ArrayBuffer = arrayBuffer => {
    let base64    = ''
    let encodings = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'

    let bytes = new Uint8Array(arrayBuffer)
    let byteLength = bytes.byteLength
    let byteRemainder = byteLength % 3
    let mainLength = byteLength - byteRemainder

    let a, b, c, d
    let chunk

    for (let i = 0; i < mainLength; i = i + 3) {
      chunk = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2]

      a = (chunk & 16515072) >> 18
      b = (chunk & 258048)   >> 12
      c = (chunk & 4032)     >>  6
      d = chunk & 63

      base64 += encodings[a] + encodings[b] + encodings[c] + encodings[d]
    }

    if (byteRemainder === 1) {
      chunk = bytes[mainLength]

      a = (chunk & 252) >> 2
      b = (chunk & 3)   << 4

      base64 += encodings[a] + encodings[b] + '=='
    }
    else if (byteRemainder === 2) {
      chunk = (bytes[mainLength] << 8) | bytes[mainLength + 1]

      a = (chunk & 64512) >> 10
      b = (chunk & 1008)  >>  4

      c = (chunk & 15)    <<  2 // 15    = 2^4 - 1

      base64 += encodings[a] + encodings[b] + encodings[c] + '='
    }

    return base64
  }

  let base64Strings = []
  if(!loading)
    images.map(image => base64Strings.push(base64ArrayBuffer(image.img.data.data)))

  const collage = []

  for(let i = 0; i < images.length; i+=2) {
    if(i + 2 <= images.length) {
      collage.push(
        <Row key={images[i].img.name} className='align-items-center mb-5'>
          <Col className='mr-5'>
            <Row>
              <img src={`data:image/${images[i].img.contentType};base64,${base64Strings[i]}`} alt='PogU Art' />
            </Row>
            // <Row className='justify-content-center mt-2'>
            //   <a className='text-light' style={{textDecoration: 'none'}} href='/'>
            //     <small>SOURCE</small>
            //   </a>
            // </Row>
          </Col>
          <Col>
            <Row>
              <img src={`data:image/${images[i].img.contentType};base64,${base64Strings[i+1]}`} alt='PogU Art' />
            </Row>
            // <Row className='justify-content-center mt-2'>
            //   <a className='text-light' style={{textDecoration: 'none'}} href='/'>
            //     <small>SOURCE</small>
            //   </a>
            // </Row>
          </Col>
        </Row>
      )
    }
    else {
      collage.push(
        <Row key={images[i].img.name} className='align-items-center mb-5'>
          <Col className='mr-5'>
            <Row>
              <img src={`data:image/${images[i].img.contentType};base64,${base64Strings[i]}`} alt='PogU Art' />
            </Row>
            // <Row className='justify-content-center mt-2'>
            //   <a className='text-light' style={{textDecoration: 'none'}} href='/'>
            //     <small>SOURCE</small>
            //   </a>
            // </Row>
          </Col>
          <Col></Col>
        </Row>
      )
    }
  }

  return (
    <Fragment>
      <Container className='text-center'>

        {loading ? <Spinner color='primary' /> :
          <Row className='align-items-center mb-5'>
            <h1>{images.length} PogU Arts</h1>
            {collage}
          </Row>
        }
      </Container>
    </Fragment>
  )
}

export default Collage
