import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import profile from './profile'
import auth from './auth'

const reducer = combineReducers({
  profile,
  auth
})

const store = configureStore({ reducer })

export default store
