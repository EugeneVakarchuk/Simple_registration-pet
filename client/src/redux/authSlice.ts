import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuth: false,
}

export const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuth(state, action) {
      try {
        state.isAuth = action.payload;
      } catch (e) {
        console.log(e);
      }
    }
  }
});

export default authSlice.reducer;
export const {
  setAuth,
} = authSlice.actions;