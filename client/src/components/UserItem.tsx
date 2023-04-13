import React, { FC } from 'react';
import compStyles from '../styles/comp.module.less';

type props = {
  index: number
  id: string
  email: string
}

const UserItem: FC<props> = (props) => {
  return (
    <div className={compStyles.userItemConainer}>
      <span>{props.index}</span>
      <div className={compStyles.userInformationContainer}>
        <span>id: {props.id}</span>
        <span>email: {props.email}</span>
      </div>
    </div>
  );
};

export default UserItem;