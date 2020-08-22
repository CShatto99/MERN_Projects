import axios from 'axios'
import { createSlice } from '@reduxjs/toolkit'

const image = createSlice({
  name: 'image',
  initialState: {
    images: [],
    loading: true
  },
  reducers: {
    get_images: (state, action) => {
      return {
        ...state,
        images: action.payload,
        loading: false
      }
    }
  }
})

export default image.reducer

const { get_images } = image.actions

export const getImages = () => async dispatch => {
  try {
    const res = await axios.get('/api/images')

    dispatch(get_images(res.data))
  } catch(err) {
    console.error(err.message)
  }
}
