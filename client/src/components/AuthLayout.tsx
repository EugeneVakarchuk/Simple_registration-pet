import React, { FC, useRef, useState } from 'react';
import Toggle from '../ui/Toggle';
import compStyles from '../styles/comp.module.less';
import pageStyles from '../styles/pages.module.less'
import { Outlet, useNavigate } from 'react-router';
import { SwitchTransition, CSSTransition } from 'react-transition-group';
import animationStyles from '../styles/formAnimation.module.less';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { setActiveForm } from '../redux/formSlice';


const AuthLayout: FC = () => {

  // Create states.
  const navigate = useNavigate();
  const outletRef = useRef<HTMLDivElement>(null);
  const activeForm = useAppSelector(state => state.formReducer.activeForm);
  const dispatch = useAppDispatch();
  const [isAnimating, setIsAnimating] = useState(false);
  const animationDuration = 300;


  // This function is for switching to the login form.
  const changeFormToLogin = () => {
    if (activeForm !== 'login' && !isAnimating) {
      setIsAnimating(true);
      setTimeout(() => {
        navigate('login');
        setIsAnimating(false);
      }, animationDuration);
      dispatch(setActiveForm('login'));
    };
  };

  // This function is for switching to the signup.
  const changeFormToRegistration = () => {
    if (activeForm !== 'signup' && !isAnimating) {
      setIsAnimating(true);
      setTimeout(() => {
        navigate('signup');
        setIsAnimating(false);
      }, animationDuration);
      dispatch(setActiveForm('signup'));
    };
  };

  // This function is used for when the form is exited.
  const onExited = () => {
    const form = outletRef.current;
    if (form) {
      form.classList.remove('form-exit');
      form.classList.add('form-enter');
      setTimeout(() => {
        form.classList.remove('form-enter');
      }, animationDuration);
    };
  };

  return (
    <div className={pageStyles.authWrapper}>
      <div className={pageStyles.authCotainer}>
        <div className={compStyles.toggleWrapper}>
          <Toggle
            onClick={changeFormToLogin}
            active={activeForm === 'login'}
          >
            Login
          </Toggle>
          <Toggle
            onClick={changeFormToRegistration}
            active={activeForm === 'signup'}
          >
            Sign up
          </Toggle>
        </div>
        <div>
          <SwitchTransition mode="out-in">
            <CSSTransition
              key={activeForm}
              nodeRef={outletRef}
              timeout={animationDuration}
              classNames={{
                enter: animationStyles.MyClassEnter,
                enterActive: animationStyles.MyClassEnterActive,
                exit: animationStyles.MyClassExit,
                exitActive: animationStyles.MyClassExitActive
              }}
              onExited={onExited}
            >
              <div ref={outletRef} className='form'>
                <Outlet />
              </div>
            </CSSTransition>
          </SwitchTransition>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;