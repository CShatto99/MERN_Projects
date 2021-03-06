import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import setAuthToken from '../utils/setAuthToken'
import { clearNotes } from './note'
import { setAlert } from './alert'

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
      localStorage.setItem('token', action.payload.accessToken)
      localStorage.setItem('refreshToken', action.payload.refreshToken)
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false
      }
    },
    load_user: (state, action) => {
      localStorage.setItem('token', action.payload.acessToken)
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        loading: false
      }
    },
    clear_user: (state, action) => {
      localStorage.removeItem('token')
      localStorage.removeItem('refreshToken')
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
    dispatch(setAlert(err.response.data.msg, err.response.status))
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
    dispatch(setAlert(err.response.data.msg, err.response.status))
  }
}

export const loadUser = (accessToken = null) => async dispatch => {
  if(localStorage.token)
    setAuthToken(localStorage.token)

  if(accessToken)
    setAuthToken(accessToken)

  try {
    const res = await axios.get('/api/auth')

    dispatch(load_user(res.data))
  } catch(err) {
    if(err.response.status === 401) {
      const res = await axios.post('/api/auth/token', { refreshToken: localStorage.refreshToken})
      dispatch(loadUser(res.data.accessToken))
    }
    dispatch(setAlert(err.response.data.msg, err.response.status))
  }
}

export const deleteUser = () => async dispatch => {
  try {
    dispatch(logout())

    await axios.delete('/api/auth')
  } catch(err) {
    if(err.response.status === 401) {
      const res = await axios.post('/api/auth/token', { refreshToken: localStorage.refreshToken})
      dispatch(loadUser(res.data.accessToken))
    }
    dispatch(setAlert(err.response.data.msg, err.response.status))
  }
}

export const editAccount = formData => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  try {
    const res = await axios.put('/api/auth', formData, config)
    dispatch(load_user(res.data))
  } catch(err) {
    if(err.response.status === 401) {
      const res = await axios.post('/api/auth/token', { refreshToken: localStorage.refreshToken})
      dispatch(loadUser(res.data.accessToken))
    }
    dispatch(setAlert(err.response.data.msg, err.response.status))
  }
}

export const logout = () => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }

  try {
    console.log(localStorage.refreshToken)
    await axios.delete('/api/auth/logout', { token: localStorage.getItem('refreshToken') }, config)

    dispatch(clear_user())
    dispatch(clearNotes())
  } catch(err) {
    dispatch(setAlert(err.response.data.msg, err.response.status))
  }
}
