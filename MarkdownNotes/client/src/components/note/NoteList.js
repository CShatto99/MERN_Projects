import React, { Fragment, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Moment from 'react-moment'
import marked from 'marked'
import { CSSTransition } from 'react-transition-group'
import {
  Button,
  ListGroup,
  ListGroupItem,
  Spinner
} from 'reactstrap'
import AddNote from './AddNote'
import EditNote from './EditNote'
import { getNotes, deleteNote } from '../../store/note'



const NoteList = () => {
  const dispatch = useDispatch()
  const { isAuthenticated, } = useSelector(state => state.auth)
  const { notes, loading } = useSelector(state => state.note)

  useEffect(() => {
    if(isAuthenticated) dispatch(getNotes())
  }, [isAuthenticated, dispatch])

  if(!isAuthenticated)
    return <Redirect to='/' />

  const rawMarkup = note => {
    let rawMarkup = marked(note)
    return { __html: rawMarkup }
  }

  return (
    <div>
      {loading ?
        <div className='d-flex justify-content-center'>
          <Spinner size='lg' color='light'/>
        </div> :
        <Fragment>
          <ListGroup className='mb-2 text-center' >
            <ListGroupItem className='list-group-item-cust'>
              <h2>Your Markdown Notes</h2>
            </ListGroupItem>
            <ListGroupItem className='list-group-item-cust'>
              <AddNote />
            </ListGroupItem>
          </ListGroup>
          {notes.length === 0 ?
            <ListGroup className='mb-2 text-center'>
              <ListGroupItem className='list-group-item-cust'>
                <h4>It looks like you don't have any notes...</h4>
              </ListGroupItem>
            </ListGroup> :
            <ListGroup>
              {notes.map(({ note, _id, date }) => (
                <CSSTransition key={_id} timeout={500} classNames='note-item'>
                  <ListGroup className='mb-1' key={_id}>
                    <ListGroupItem className='list-group-item-cust'>
                      <small>Created on <Moment format='MMM Do, YYYY hh:mm:ss A'>{date}</Moment></small>
                      <Button
                        className='float-right ml-1'
                        size='sm'
                        color='danger'
                        onClick={() => dispatch(deleteNote(_id))}
                      >
                        <i className="fa fa-trash" aria-hidden="true"></i>
                      </Button>
                      <EditNote _id={_id} note={note} />
                    </ListGroupItem>
                    <ListGroupItem className='list-group-item-cust'>
                      <h3>
                        <i className="fa fa-sticky-note" aria-hidden="true"></i>{' '}
                        <span dangerouslySetInnerHTML={rawMarkup(note)} />
                      </h3>
                    </ListGroupItem>
                  </ListGroup>
                </CSSTransition>
              ))}
            </ListGroup>
          }
        </Fragment>
      }
    </div>
  )
}

export default NoteList
