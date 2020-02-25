import { Header } from 'header/header';
import * as mobxReact from 'mobx-react';
import React from 'react';
import { UserInfo } from 'services/user/user_dto';


export function createHeader({
  userInfo,
}: {
  userInfo: UserInfo | undefined,
}) {
  const HeaderImpl = mobxReact.observer(() => {
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
