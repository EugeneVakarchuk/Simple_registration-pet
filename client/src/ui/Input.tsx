import React, { FC, ChangeEvent } from 'react';
import classes from '../styles/ui.module.less';
import Label from './Label';

type props = {
  value: string
  type: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder: string
  label: string
}

const Input: FC<props> = (props) => {
  return (
    <>
      <Label>{props.label}</Label>
      <input
        type={props.type}
        value={props.value}
        onChange={props.onChange}
        placeholder={props.placeholder}
        className={classes.input}
      />
    </>
  );
};

export default Input;