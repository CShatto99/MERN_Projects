import React, { useState } from 'react'
import { CSSTransition } from 'react-transition-group'
import {
  Button,
  ListGroup,
  ListGroupItem
} from 'reactstrap'

const NoteList = () => {
  return (
    <div>
      <ListGroup className='mb-2 text-center'>
        <ListGroupItem><h2>Your Markdown Notes</h2></ListGroupItem>
      </ListGroup>
      <ListGroup>
        <CSSTransition timout={500} classNames='note-item'>
          <ListGroupItem>This is note #1</ListGroupItem>
        </CSSTransition>
        <CSSTransition timout={500} classNames='note-item'>
          <ListGroupItem>This is note #2</ListGroupItem>
        </CSSTransition>
        <CSSTransition timout={500} classNames='note-item'>
          <ListGroupItem>This is note #2</ListGroupItem>
        </CSSTransition>
      </ListGroup>
    </div>
  )
}

export default NoteList
