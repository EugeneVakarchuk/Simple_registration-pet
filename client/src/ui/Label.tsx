import React, { FC } from 'react';
import classes from '../styles/ui.module.less';

type props = {
  children: string;
}

const Label: FC<props> = (props) => {
  return (
    <label className={classes.label}>
      {props.children}
    </label>
  );
};

export default Label;