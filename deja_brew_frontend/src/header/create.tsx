import { UserInfoStore } from 'auth/auth_helpers';
import { Header } from 'header/header';
import { History } from 'history';
import * as mobx from 'mobx';
import * as mobxReact from 'mobx-react';
import React from 'react';


export function createHeader({
  userInfoStore,
  history,
}: {
  userInfoStore: UserInfoStore,
  history: History,
}) {
  const showBackButton = mobx.observable.box(false);
  const goBack = () => history.goBack();
  const initialHistoryKey = history.location.key;
  history.listen((ev) => {
    showBackButton.set(ev.key != initialHistoryKey);
  });

  const HeaderImpl = mobxReact.observer(() => {
    const userInfo = userInfoStore.userInfo?.state === 'fulfilled'
        ? userInfoStore.userInfo.value
        : undefined;
    return (
        <Header
            userInfo={userInfo}
            onBackClick={showBackButton.get() ? goBack : undefined}
        />
    );
  });

  return {
    Header: HeaderImpl,
  };
}
