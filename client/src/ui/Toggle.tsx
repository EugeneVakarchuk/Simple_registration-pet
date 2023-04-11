import React, { FC, MouseEvent } from 'react';
import classes from '../styles/ui.module.less';

type props = {
  children: string
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
}

const Toggle: FC<props> = (props) => {
  return (
    <button className={classes.toggle} onClick={props.onClick} >
      {props.children}
    </button>
  );
};

export default Toggle;