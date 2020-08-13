import axios from 'axios'
import { createSlice } from '@reduxjs/toolkit'

const profile = createSlice({
  name: 'profile',
  initialState: {
    profile: {},
    loading: true
  },
  reducers: {
    load_profile: (state, action) => {
      return {
        ...state,
        profile: action.payload,
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
