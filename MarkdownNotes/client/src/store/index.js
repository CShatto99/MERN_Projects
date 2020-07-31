import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import auth from './auth'
import note from './note'

const reducer = combineReducers({
  auth,
  note
})

const store = configureStore({ reducer })

export default store
