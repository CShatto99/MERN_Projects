import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const user = createSlice({
  name: 'user',
  initialState: {
    name: '',
    email: '',
    isAuthenticated: false,
    loading: true
  },
  reducers: {
    register_user: (state, action) => {
      return {
        ...state,
        name: action.payload.user.name,
        email: action.payload.user.email,
        isAuthenticated: true,
        loading: false
      }
    },
    login_user: (state, action) => {
      return {
        ...state,
        name: action.payload.user.name,
        email: action.payload.user.email,
        isAuthenticated: true,
        loading: false
      }
    }
  }
})

export default user.reducer

const { register_user, login_user } = user.actions

export const register = user => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const res = await axios.post('/api/user', user, config)

    dispatch(register_user(res.data))
  } catch(err) {
    console.error(err.message)
    // dispatch error
  }
}

export const login = user => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const res = await axios.post('/api/auth', user, config)

    dispatch(login_user(res.data))
  } catch(err) {
    console.error(err.message)
    // dispatch error
  }
}
