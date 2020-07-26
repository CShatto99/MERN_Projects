import React, { Fragment } from 'react'

export default () => {
  return (
    <Fragment>
      <i
        className="fa fa-spinner fa-spin"
        style={{
          fontSize: '60px',
          color: '#17a2b8',
          display: 'flex',
          marginTop: '50px',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        aria-hidden="true"
      />
    </Fragment>
  )
}
