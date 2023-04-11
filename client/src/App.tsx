import axios from "axios";
import React, { useEffect, useState } from "react";
import classes from './styles/app.module.less';
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

  const [isLoading, setIsLoading] = useState<boolean>(false)

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
        setIsLoading(false);
      }).catch(error => {
        setIsLoading(false);
        console.log(error)
      })
    }
  }, [])

  useEffect(() => {
    if (!isLoading && isAuth) {
      navigate('/main')
    }
  }, [isLoading, isAuth])

  return (
    <div className={classes.App}>
      <Routes>
        <Route path='/' element={<Navigate to='/main' />} />
        <Route path='auth/*' element={<AuthPage />} />
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