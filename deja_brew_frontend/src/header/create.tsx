import { UserInfoStore } from 'auth/auth_helpers';
import { Header } from 'header/header';
import { History } from 'history';
import * as mobx from 'mobx';
import * as mobxReact from 'mobx-react';
import React from 'react';

export class HeaderConfiguration {
  @mobx.observable.ref
  onBackClick?: () => void;
}

export function createHeader({
  userInfoStore,
  history,
}: {
  userInfoStore: UserInfoStore,
  history: History,
}) {
  const onBackClick = () => history.goBack();

  const headerConfiguration = new HeaderConfiguration();
  const HeaderImpl = mobxReact.observer(() => {
    const userInfo = userInfoStore.userInfo?.state === 'fulfilled'
        ? userInfoStore.userInfo.value
        : undefined;
    return (
        <Header
            userInfo={userInfo}
            onBackClick={onBackClick}
        />
    );
  });

  return {
    Header: HeaderImpl,
    headerConfiguration: HeaderConfiguration,
  };
}
