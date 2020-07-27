import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addPost } from '../../actions/post'

const PostForm = ({ addPost }) => {
  const [text, setText] = useState('')

  const [formIsOpen, toggleForm] = useState(false)

  return (
    <div class="post-form">
      <div class="bg-primary p">
        <h3>Say Something...</h3>
      </div>
      {formIsOpen ?
        <form class="form my-1" onSubmit={e => {
          e.preventDefault()
          addPost({ text })
          setText('')
        }}>
          <textarea
            name="text"
            cols="30"
            rows="5"
            placeholder="Create a post"
            required
            value={text}
            onChange={e => setText(e.target.value)}
          ></textarea>
          <input type="submit" class="btn btn-dark my-1" value="Submit" />
          <button class='btn btn-light my-1' onClick={() => toggleForm(!formIsOpen)}>Cancel</button>
        </form> :
        <button class='btn btn-dark my-1' onClick={() => toggleForm(!formIsOpen)}>Create Post</button>
      }
    </div>
  )
}

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired
}

export default connect(null, { addPost })(PostForm)
