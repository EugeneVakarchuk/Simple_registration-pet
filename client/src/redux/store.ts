import { combineReducers, configureStore } from "@reduxjs/toolkit";
import loginReducer from './userSlice';
import authReducer from "./authSlice";
import formReducer from './formSlice';

const rootReducer = combineReducers({
  loginReducer,
  authReducer,
  formReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];