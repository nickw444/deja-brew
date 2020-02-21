import { UserInfoStore } from 'auth/auth_helpers';
import { Header } from 'header/header';
import * as mobxReact from 'mobx-react';
import React from 'react';


export function createHeader({
  userInfoStore,
}: {
  userInfoStore: UserInfoStore,
}) {
  const HeaderImpl = mobxReact.observer(() => {
    const userInfo = userInfoStore.userInfo?.state === 'fulfilled'
        ? userInfoStore.userInfo.value
        : undefined;
    return (
        <Header
            userInfo={userInfo}
        />
    );
  });

  return {
    Header: HeaderImpl,
  };
}
