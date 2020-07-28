import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import timer from './timer'

const reducer = combineReducers({
  timer
})

const store = configureStore({ reducer })

export default store
