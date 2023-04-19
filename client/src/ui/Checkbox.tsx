import React, { FC, InputHTMLAttributes } from 'react';
import { UseFormRegisterReturn } from "react-hook-form";
import uiStyles from '../styles/ui.module.less';

interface props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  type: string;
  errors?: string | undefined;
  register: UseFormRegisterReturn
}

const Checkbox: FC<props> = ({
  label,
  type,
  register,
  ...inputProps
}) => {
  return (
    <div className={uiStyles.checkobxContainer}>
      <label className={uiStyles.checkboxText}>{label}</label>
      <input
        className={uiStyles.checkbox}
        type={type}
        {...register} {...inputProps}
      />
    </div>
  );
};

export default Checkbox;