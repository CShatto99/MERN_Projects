import React from 'react'
import {
  Container,
  Row
} from 'reactstrap'
import authors from '../json/authors.json'

const Authors = () => {
  return (
    <Container className='text-center'>
      <Row className='justify-content-center mb-3'>
        <h1 className='mobile-header1'>{authors.length} Authors</h1>
      </Row>
      {authors.authors.map(author => (
        <Row key={author} className='justify-content-center mb-3'>
          <a style={{textDecoration: 'none'}} href={`https://www.reddit.com/user/${author.substring(2)}/`} target='__blank'>{author}</a>
        </Row>
      ))}
    </Container>
  )
}

export default Authors
