import axios from "axios";
import React, { useEffect } from "react";
import classes from './app.module.less';
import AuthField from "./components/AuthField";
import MainPage from "./components/MainPage";
import { useAppDispatch, useAppSelector } from "./hooks/redux";
import { setAuth } from "./redux/authSlice";
import { login } from "./redux/userSlice";

const App: React.FC = (props) => {

  const isAuth = useAppSelector(state => state.authReducer.isAuth);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!!localStorage.getItem('token')) {
      const checkAuth = async () => {
        const response = await axios.get(`${process.env.API_URL}/refresh`, { withCredentials: true });
        return response;
      }
      const response = checkAuth();
      response.then(data => {
        const user = data.data.user
        dispatch(setAuth(true));
        dispatch(login({
          email: user.email,
          id: user.id
        }))
      })
    }
  }, [])

  return (
    <div className={classes.App}>
      {
        (isAuth === false)
          ? <AuthField />
          : <MainPage />
      }
    </div>
  )

}

export default App;