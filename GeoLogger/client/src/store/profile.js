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
        visited: action.payload.visited,
        fillColor: action.payload.fillColor,
        loading: false
      }
    }
  }
})

export default profile.reducer

const { load_profile } = profile.actions

export const loadProfile = profile_id => async dispatch => {
  try {
    const res = await axios.get(`/api/profile/${profile_id}`)
    dispatch(load_profile(res.data))
  } catch(err) {
    console.error(err.message)
    // dispach alert
  }
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
