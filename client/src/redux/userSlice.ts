import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "../models/IUser";


const initialState: IUser = {
  username: null,
  email: null,
  _id: null,
}


export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login(state, action) {
      try {
        state.username = action.payload.username;
        state.email = action.payload.email;
        state._id = action.payload.id
      } catch (e) {
        console.log(e);
      }
    },
    logout(state) {
      try {
        state.username = null;
        state.email = null;
        state._id = null;
      } catch (e) {
        console.log(e);
      }
    }
  }
})

export default userSlice.reducer;
export const {
  login,
  logout
} = userSlice.actions;