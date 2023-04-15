import React, { FC } from 'react';
import uiStyles from '../styles/ui.module.less';

type props = {
  valueName: string
  value: string
}

const UserTextValue: FC<props> = (props) => {
  return (
    <div>
      <span className={uiStyles.UserTextValueName}>
        {props.valueName}
      </span>
      <span>: </span>
      <span className={uiStyles.UserTextValue}>
        {props.value}
      </span>
    </div>
  );
};

export default UserTextValue;