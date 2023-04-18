import React, { FC, InputHTMLAttributes } from 'react';
import { UseFormRegisterReturn, MultipleFieldErrors } from "react-hook-form";

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
    <div>
      <label htmlFor={inputProps.id}>{label}
        <input type={type} placeholder={placeholder} {...register} {...inputProps} />
      </label>
      <div>
        {errors && <span>{errors}</span>}
      </div>
    </div>
  );
};

export default Input;