import axios from 'axios'
import { createSlice } from '@reduxjs/toolkit'

const profile = createSlice({
  name: 'profile',
  initialState: {
    profile: {},
    visited: [],
    fillColor: '',
    loading: true
  },
  reducers: {
    load_profile: (state, action) => {
      return {
        ...state,
        profile: action.payload,
        loading: false
      }
    },
    clear_profile: (state, action) => {
      return {
        ...state,
        profile: {}
      }
    }
  }
})

export default profile.reducer

const { load_profile, clear_profile } = profile.actions

export const loadProfile = () => async dispatch => {
  try {
    const res = await axios.get(`/api/profile`)
    dispatch(load_profile(res.data))
  } catch(err) {
    console.error(err.message)
    // dispach alert
  }
}

export const updateProfile = profile => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  try {
    const { data } = await axios.post('/api/profile', profile, config)

    dispatch(load_profile(data))
  } catch(err) {
    console.error(err.message)
    // alert
  }
}

export const clearProfile = () => dispatch => {
  dispatch(clear_profile());
}

export const updateVisited = (profile_id, visited) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  try {
    const res = await axios.post(`/api/profile/${profile_id}/visited`, { visited }, config)
    dispatch(load_profile(res.data))
  } catch(err) {
    console.error(err.message)
    // alert
  }
}

export const updateFill = (profile_id, fillColor) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  try {
    const res = await axios.post(`/api/profile/${profile_id}/fill`, { fillColor }, config)
    dispatch(load_profile(res.data))
  } catch(err) {
    console.error(err.message)
    // dispatch alert
  }
}
