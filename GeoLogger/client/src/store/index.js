import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import profile from './profile'

const reducer = combineReducers({
  profile
})

const store = configureStore({ reducer })

export default store
