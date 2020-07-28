import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const timer = createSlice({
  name: 'timer',
  initialState: {
    timer: {},
    loading: true,
    error: ''
  },
  reducers: {
    add_timer: (state, action) => {
      return {
        ...state,
        timer: action.payload,
        loading: false
      }
    },
    error_action: (state, action) => {
      return {
        ...state,
        timer: {},
        loading: false,
      }
    }
  }
})

export default timer.reducer

const { add_timer, error_action} = timer.actions

export const addTimer = formData => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const res = await axios.post('/api/timer', formData, config)

    dispatch(add_timer(res.data))
  } catch(err) {
    console.error(err.response.data)

    dispatch(error_action())
  }
}
