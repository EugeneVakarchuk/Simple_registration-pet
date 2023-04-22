import { createSlice } from "@reduxjs/toolkit";

type formTypes = {
  activeForm: 'login' | 'signup';
}

const initialState: formTypes = {
  activeForm: 'login',
}

export const formSlice = createSlice({
  name: 'activeForm',
  initialState,
  reducers: {
    setActiveForm(state, action) {
      try {
        state.activeForm = action.payload;
      } catch (e) {
        console.log(e);
      }
    }
  }
});

export default formSlice.reducer;
export const {
  setActiveForm,
} = formSlice.actions;