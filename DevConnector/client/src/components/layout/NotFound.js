import React, { Fragment } from 'react'

const NotFound = () => {
  return (
    <Fragment>
      <h1 className='x-large text-primary'>
        <i className='fa fa-exclamation-triangle'></i> Page Not Found
      </h1>
      <p className='large'>This page does not exist</p>
    </Fragment>
  )
}

export default NotFound
