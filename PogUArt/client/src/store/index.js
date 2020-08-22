import { combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import image from './image'

const reducer = combineReducers({
  image
})

const store = configureStore({ reducer })

export default store
