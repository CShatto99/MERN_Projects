import { createSlice } from "@reduxjs/toolkit";

const auth = createSlice({
  name: "auth",
  initialState: {
    user: {},
    isAuth: false,
    loading: true,
  },
  reducers: {
    login_user: (state, action) => {
      return {
        ...state,
        user: action.payload,
        isAuth: true,
        loading: false,
      };
    }
  },
});

export default auth.reducer;

const { login_user } = auth.actions;

export const register = (user) => (dispatch) => {
  dispatch(login_user(user));
};

export const login = (user) => (dispatch) => {
  dispatch(login_user(user));
};
