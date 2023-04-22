import React, { FC, MouseEvent, ReactNode } from 'react';
import classes from '../styles/ui.module.less';

type props = {
  children: ReactNode;
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
};

const Button: FC<props> = ({ children, onClick }) => {
  return (
    <button className={classes.button} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;