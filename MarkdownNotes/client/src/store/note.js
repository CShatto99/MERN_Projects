import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import setAuthToken from '../utils/setAuthToken'

const note = createSlice({
  name: 'note',
  initialState: {
    notes: null,
    loading: true
  },
  reducers: {
    get_notes: (state, action) => {
      return {
        ...state,
        notes: action.payload,
        loading: false
      }
    },
    notes_loaded: (state, action) => {
      return {
        ...state,
        loading: false
      }
    },
    create_note: (state, action) => {
      return {
        ...state,
        notes: [...state.notes, { note: action.payload.note }],
        loading: false
      }
    },
    delete_note: (state, action) => {
      return {
        ...state,
        notes: action.payload,
        loading: false
      }
    }
  }
})

export default note.reducer

const { get_notes, create_note, delete_note } = note.actions

export const getNotes = () => async dispatch => {
  try {
    const res = await axios.get('/api/note')
    dispatch(get_notes(res.data))
  } catch(err) {
    console.error(err.message)
    // dispatch err
  }
}

export const createNote = note => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  try {
    const res = axios.post('/api/note', note, config)

    dispatch(create_note(res.data))
  } catch(err) {
    console.error(err.message)
    // dispatch err
  }
}

export const deleteNote = _id => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  try {
    const res = await axios.delete(`/api/note/${_id}`, config)

    dispatch(delete_note(res.data))
  } catch(err) {
    console.error(err.message)
    // dispatch err
  }
}
