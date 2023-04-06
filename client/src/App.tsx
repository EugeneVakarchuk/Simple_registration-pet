import axios from "axios";
import React, { useEffect } from "react";
import classes from './app.module.less';
import MainPage from "./pages/MainPage";
import { useAppDispatch, useAppSelector } from "./hooks/redux";
import { setAuth } from "./redux/authSlice";
import { login } from "./redux/userSlice";
import AuthPage from "./pages/AuthPage";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { RequireAuth } from "./hoc/RequireAuth";


const App: React.FC = () => {

  const isAuth = useAppSelector(state => state.authReducer.isAuth);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!!localStorage.getItem('token')) {
      const checkAuth = async () => {
        const response = await axios.get(`${process.env.API_URL}/refresh`, { withCredentials: true });
        return response;
      }
      const response = checkAuth();
      response.then(data => {
        const user = data?.data?.user
        dispatch(setAuth(true));
        dispatch(login({
          email: user.email,
          id: user.id
        }))
        navigate('/main');
      })
    }
  }, [dispatch, navigate])

  return (
    <div className={classes.App}>
      <Routes>
        <Route path='/' element={<Navigate to='/main' />} />
        <Route path='auth' element={<AuthPage />} />
        <Route path="/main" element={
          <RequireAuth>
            <MainPage />
          </RequireAuth>
        } />
      </Routes>
    </div>
  )


}

export default App;