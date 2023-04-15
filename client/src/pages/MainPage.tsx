import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { setAuth } from '../redux/authSlice';
import { logout } from '../redux/userSlice';
import AuthService from '../services/AuthService';
import { useNavigate } from 'react-router-dom';
import Button from '../ui/Button';
import pageStyles from '../styles/pages.module.less';
import { IUser } from '../models/IUser';
import UserService from '../services/UserService';
import UserItem from '../components/UserItem';
import UserTextValue from '../ui/UserTextValue';

const MainPage = () => {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { username, email, _id } = useAppSelector(state => state.loginReducer)

  const logoutButton = () => {
    dispatch(logout());
    dispatch(setAuth(false));
    localStorage.removeItem('token');
    AuthService.logout();
    navigate('/', { replace: true })
  }

  const [users, setUsers] = useState<Array<IUser>>(null);
  const [usersLoaded, setUsersLoaded] = useState(false);

  const getUsers = async () => {
    const response = await UserService.fetchUsers();
    if (!!response) {
      const usersList = response.data;
      setUsers(usersList);
      setUsersLoaded(true);
    }
  }

  const clearUsersList = () => {
    setUsers(null)
    setUsersLoaded(false);
  }

  return (
    <div className={pageStyles.mainContainer}>
      <header className={pageStyles.header}>
        <div>
          <h2>Hello {username}</h2>
          <div className={pageStyles.informationWrapper}>
            <UserTextValue
              valueName='Your id'
              value={_id}
            />
            <UserTextValue
              valueName='Your email:'
              value={email}
            />
          </div>
        </div>
        <div className={pageStyles.headerButtonWrapper}>
          <Button onClick={logoutButton}>logout</Button>
        </div>
      </header>
      <div className={pageStyles.getUsersContainer}>
        {
          !usersLoaded
            ?
            <div className={pageStyles.pageButtonWrapper}>
              <Button onClick={getUsers}>Get users list</Button>
            </div>
            :
            <div className={pageStyles.pageButtonWrapper}>
              <Button onClick={clearUsersList}>Clear</Button>
            </div>
        }
        <div>
          {
            !!usersLoaded
              ?
              <div className={pageStyles.userListConainer}>
                {
                  users.map((el, index) => {
                    return (
                      <UserItem
                        key={index}
                        username={el.username}
                        id={el._id}
                        email={el.email}
                        index={index + 1}
                      />
                    )
                  })
                }
              </div>
              :
              <>
              </>
          }
        </div>
      </div>
    </div>
  );
};

export default MainPage;