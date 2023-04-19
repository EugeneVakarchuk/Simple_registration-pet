import React, { FC } from 'react';
import uiStyles from '../styles/ui.module.less';

type props = {
  isValid: boolean
  text: string
}

const SubmitButton: FC<props> = (props) => {
  return (
    <div >
      <input className={props.isValid ? `${uiStyles.buttonDisable}` : `${uiStyles.button}`} type='submit' disabled={props.isValid} value={props.text} />
    </div>
  );
};

export default SubmitButton;