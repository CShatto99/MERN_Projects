import React, { Fragment, useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Moment from 'react-moment'
import { CSSTransition } from 'react-transition-group'
import {
  Button,
  ListGroup,
  ListGroupItem
} from 'reactstrap'
import NoteModal from './NoteModal'
import { getNotes, deleteNote } from '../store/note'

const NoteList = () => {
  const dispatch = useDispatch()
  const { isAuthenticated, loading, } = useSelector(state => state.auth)
  const { notes } = useSelector(state => state.note)

  useEffect(() => {
    if(isAuthenticated && !loading) dispatch(getNotes())
  }, [isAuthenticated, dispatch, getNotes])

  if(!isAuthenticated)
    return <Redirect to='/' />

  return (
    <div>
      {notes && !loading ?
        <Fragment>
          <ListGroup className='mb-2 text-center'>
            <ListGroupItem><h2>Your Markdown Notes</h2></ListGroupItem>
            <ListGroupItem>
              <NoteModal />
            </ListGroupItem>
          </ListGroup>
          <ListGroup>
            {notes.map(({ note, _id, date }) => (
              <CSSTransition key={_id} timeout={500} classNames='note-item'>
                <ListGroupItem key={_id}>
                  <small>Created on <Moment format='MMM Do, YYYY hh:mm:ss A'>{date}</Moment></small>
                  <br/>
                  <h5>
                    <i className="fa fa-sticky-note" aria-hidden="true"></i>{' '}
                    {note}

                    <Button
                      className='float-right ml-1'
                      size='sm'
                      color='danger'
                      onClick={() => dispatch(deleteNote(_id))}
                    >
                      <i className="fa fa-trash" aria-hidden="true"></i>
                    </Button>
                    <Button
                      className='float-right ml-1'
                      size='sm'
                      color='primary'
                    >
                      <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                    </Button>
                  </h5>
                </ListGroupItem>
              </CSSTransition>
            ))}
          </ListGroup>
        </Fragment> :
        <h1>Loading...</h1>
      }

    </div>
  )
}

export default NoteList
