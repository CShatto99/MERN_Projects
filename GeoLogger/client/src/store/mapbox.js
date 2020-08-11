import { createSlice } from '@reduxjs/toolkit'

const mapbox = createSlice({
  name: 'mapbox',
  initialState: {
    fillColor: '#e16428',
    visited: [],
  },
  reducers: {
    update_visited: (state, action) => {
      return {
        ...state,
        visited: action.payload
      }
    },
    update_fill: (state, action) => {
      return {
        ...state,
        fillColor: action.payload
      }
    }
  }
})

export default mapbox.reducer

const { update_visited, update_fill } = mapbox.actions

export const updateVisited = visited => dispatch => {
  dispatch(update_visited(visited))
}

export const updateFill = fill => dispatch => {
  dispatch(update_fill(fill))
}
