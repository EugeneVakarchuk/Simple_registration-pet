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

  // Get isAuth state from redux.
  const isAuth = useAppSelector(state => state.authReducer.isAuth);

  // Declare dispatch and navigate function.
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Create state isLoading.
  const [isLoading, setIsLoading] = useState<boolean>(false);


  // Check if there is a token in local storage after first render.
  useEffect(() => {

    // If local storage have the token, then declare checkAuth function to /refresh endpoint.
    if (!!localStorage.getItem('token')) {
      const checkAuth = async () => {
        const response = await axios.get(`${process.env.API_URL}/refresh`, { withCredentials: true });
        localStorage.setItem('token', response.data.accessToken);
        return response;
      };

      // Give response using checkAuth function.
      const response = checkAuth();
      response.then(data => {

        // Get user data in response.
        const user = data?.data?.user;

        // Dispatch data.
        dispatch(setAuth(true));
        dispatch(login({
          username: user.username,
          email: user.email,
          id: user.id
        }));

        // Set isLoading to false.
        setIsLoading(false);
      }).catch(error => {
        setIsLoading(false);
        console.log(error)
      });
    };
  }, []);


  // If user is authorized redirect to /main. 
  useEffect(() => {
    if (!isLoading && isAuth) {
      navigate('/main');
    };
  }, [isLoading, isAuth]);

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