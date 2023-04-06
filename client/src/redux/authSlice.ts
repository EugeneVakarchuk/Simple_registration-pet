import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuth: false,
  succesReg: false
}

export const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuth(state, action) {
      try {
        state.isAuth = action.payload
      } catch (e) {
        console.log(e)
      }
    },
    setSuccesReg(state) {
      try {
        state.succesReg = true
      } catch (e) {
        console.log(e)
      }
    }
  }
})

export default authSlice.reducer;
export const {
  setAuth,
  setSuccesReg
} = authSlice.actions;