import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import mapbox from './mapbox'

const reducer = combineReducers({
  mapbox
})

const store = configureStore({ reducer})

export default store
