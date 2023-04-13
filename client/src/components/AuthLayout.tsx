import React, { FC, useRef, useState } from 'react';
import Toggle from '../ui/Toggle';
import compStyles from '../styles/comp.module.less';
import pageStyles from '../styles/pages.module.less'
import { Outlet, useNavigate, useLocation } from 'react-router';
import { SwitchTransition, CSSTransition } from 'react-transition-group';
import animationStyles from '../styles/formAnimation.module.less';


const AuthLayout: FC = () => {

  const navigate = useNavigate();
  const outletRef = useRef<HTMLDivElement>(null);
  const [activeForm, setActiveForm] = useState<'login' | 'signup'>('login');
  const [isAnimating, setIsAnimating] = useState(false);
  const animationDuration = 300

  const changeFormToLogin = () => {
    if (activeForm !== 'login' && !isAnimating) {
      setIsAnimating(true);
      setTimeout(() => {
        navigate('login');
        setIsAnimating(false);
      }, animationDuration);
      setActiveForm('login');
    }
  }

  const changeFormToRegistration = () => {
    if (activeForm !== 'signup' && !isAnimating) {
      setIsAnimating(true);
      setTimeout(() => {
        navigate('signup');
        setIsAnimating(false);
      }, animationDuration);
      setActiveForm('signup');
    }
  }

  const onExited = () => {
    const form = outletRef.current;
    if (form) {
      form.classList.remove('form-exit');
      form.classList.add('form-enter');
      setTimeout(() => {
        form.classList.remove('form-enter');
      }, animationDuration);
    }
  }

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