import React from 'react'
import Moment from 'react-moment'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { deleteComment } from '../../actions/post'

const CommentItem = ({
  postId,
  comment: { _id, text, name, avatar, user, date },
  auth,
  deleteComment
 }) => {
  return (
    <div className="post bg-white p-1 my-1">
      <div>
        <Link to={`/profile/${_id}`}>
          <img
            className="round-img"
            src={avatar}
            alt=""
          />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p className="my-1">{text}</p>
        <p className="post-date">Posted on <Moment format='MM/DD/YYYY'>{date}</Moment></p>
        {!auth.loading && user === auth.user._id && (
          <button className='btn btn-danger' onClick={() => deleteComment(postId, _id)} type='button'>
            <i className='fa fa-times'></i>
          </button>
        )}
      </div>
    </div>
  )
}

CommentItem.propTypes = {
  postId: PropTypes.string.isRequired,
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired
}
const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, { deleteComment })(CommentItem)