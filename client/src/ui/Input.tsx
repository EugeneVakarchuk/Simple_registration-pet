import React, { FC, InputHTMLAttributes } from 'react';
import { UseFormRegisterReturn } from "react-hook-form";
import uiStyles from '../styles/ui.module.less';

interface props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  placeholder: string;
  type: string;
  errors?: string | undefined;
  register: UseFormRegisterReturn
}

const Input: FC<props> = ({
  label,
  placeholder,
  type,
  errors,
  register,
  ...inputProps
}) => {



  return (
    <div className={uiStyles.InputContainer}>
      <label className={uiStyles.label}>{label}</label>
      <input
        className={
          errors ? `${uiStyles.input} ${uiStyles.InputError}` : uiStyles.input
        }
        type={type}
        placeholder={placeholder}
        {...register} {...inputProps} />
      <div className={uiStyles.errorContainer}>
        {errors && <span className={uiStyles.errorText}>{errors}</span>}
      </div>
    </div>
  );
};

export default Input;