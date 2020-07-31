import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import setAuthToken from '../utils/setAuthToken'

const auth = createSlice({
  name: 'auth',
  initialState: {
    token: localStorage.getItem('token'),
    user: null,
    isAuthenticated: false,
    loading: true
  },
  reducers: {
    login_user: (state, action) => {
      localStorage.setItem('token', action.payload.token)
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false
      }
    },
    load_user: (state, action) => {
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        loading: false
      }
    },
    clear_user: (state, action) => {
      localStorage.removeItem('token')
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null
      }
    }
  }
})

export default auth.reducer

const { login_user, load_user, clear_user } = auth.actions

export const register = user => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const res = await axios.post('/api/user', user, config)

    dispatch(login_user(res.data))
    dispatch(loadUser())
  } catch(err) {
    console.error(err.message)
    // dispatch error
  }
}

export const login = user => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  try {
    const res = await axios.post('/api/auth', user, config)

    dispatch(login_user(res.data))
    dispatch(loadUser())
  } catch(err) {
    console.error(err.message)
    // dispatch error
  }
}

export const loadUser = () => async dispatch => {
  if(localStorage.token)
    setAuthToken(localStorage.token)

  try {
    const res = await axios.get('/api/auth')

    dispatch(load_user(res.data))
  } catch(err) {
    console.error(err.message)
    // dispatch error
  }
}

export const logout = () => dispatch => {
  dispatch(clear_user())
}
