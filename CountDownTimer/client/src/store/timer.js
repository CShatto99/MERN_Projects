import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const timer = createSlice({
  name: 'timer',
  initialState: {
    name: '',
    date: undefined,
    time: undefined,
    loading: true,
    error: ''
  },
  reducers: {
    add_timer: (state, action) => {
      return {
        ...state,
        name: action.payload.name,
        date: action.payload.date,
        time: action.payload.time,
        loading: false
      }
    },
    modify_timer: (state, action) => {
      return {
        ...state,
        name: action.payload.name,
        date: action.payload.date,
        time: action.payload.time,
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

const { add_timer, modify_timer, error_action } = timer.actions

export const addTimer = formData => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    //const res = await axios.post('/api/timer', formData, config)

    dispatch(add_timer(formData))
  } catch(err) {
    console.error(err.response.data)

    dispatch(error_action())
  }
}

export const modifyTimer = formData => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    //const res = await axios.post('/api/timer', formData, config)

    dispatch(modify_timer(formData))
  } catch(err) {
    console.error(err.response.data)

    dispatch(error_action())
  }
}
