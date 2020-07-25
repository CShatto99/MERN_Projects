import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Spinner from '../layout/Spinner'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getProfile } from '../../actions/profile'

const Dashboard = ({ getProfile, auth: { user }, profile: { profile, loading } }) => {
  useEffect(() => {
    getProfile()
  }, [])

  return loading && profile === null ?
    <Spinner /> :
    <Fragment>
      <h1 className='large text-primary'>Dashboard</h1>
      <p className='lead'>
        <i className='fa fa-user'></i> Welcome { user && user.name }
      </p>
      { profile !== null ?
        <Fragment>
          has
        </Fragment> :
        <Fragment>
          <p>You have not yet setup a profile, please add some info.</p>
          <Link to='/create-profile' className='btn btn-primary my-1'>
            Create Profile
          </Link>
        </Fragment>
      }
    </Fragment>
}

Dashboard.propTypes = {
  getProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
})

export default connect(mapStateToProps, { getProfile })(Dashboard)
