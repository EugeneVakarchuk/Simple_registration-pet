import React, { FC } from 'react';
import compStyles from '../styles/comp.module.less';
import UserTextValue from '../ui/UserTextValue';

type props = {
  index: number
  username: string
  id: string
  email: string
}

const UserItem: FC<props> = (props) => {
  return (
    <div className={compStyles.userItemConainer}>
      <span>{props.index}</span>
      <div className={compStyles.userInformationContainer}>
        <UserTextValue
          valueName='id'
          value={props.id}
        />
        <UserTextValue
          valueName='username'
          value={props.username}
        />
        <UserTextValue
          valueName='email'
          value={props.email}
        />
      </div>
    </div>
  );
};

export default UserItem;