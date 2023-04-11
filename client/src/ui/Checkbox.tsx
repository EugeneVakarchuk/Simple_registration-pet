import React, { FC } from 'react';
import classes from '../styles/ui.module.less';

type props = {
  label: string
}

const Checkbox: FC<props> = (props) => {
  return (
    <div className={classes.checkobxContainer}>
      <label className={classes.checkboxLabel}>
        <input type="checkbox" />
        <span className={classes.checkboxText}>{props.label}</span>
      </label>
    </div>
  );
};

export default Checkbox;