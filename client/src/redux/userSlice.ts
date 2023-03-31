import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "../models/IUser";


const initialState: IUser = {
  email: '',
  id: '',
}


export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login(state, action) {
      try {
        state.email = action.payload.email;
        state.id = action.payload.id
      } catch (e) {
        console.log(e)
      }
    },
    logout(state) {
      try {
        state.email = null
        state.id = null
      } catch (e) {
        console.log(e)
      }
    }
  }
})

export default userSlice.reducer;
export const {
  login,
  logout
} = userSlice.actions;