import { Header } from 'header/header';
import * as mobxReact from 'mobx-react';
import React from 'react';
import { UserInfo } from 'services/user/user_dto';
import { CafeStatusStore } from 'ui/cafe_status/cafe_status_presenter';


export function createHeader({
  userInfo,
  cafeStatusStore,
}: {
  userInfo: UserInfo | undefined,
  cafeStatusStore: CafeStatusStore,
}) {
  const HeaderImpl = mobxReact.observer(() => {
    return (
        <Header
            showNewOrderLink={cafeStatusStore.acceptingOrders !== false}
            userInfo={userInfo}
        />
    );
  });

  return {
    Header: HeaderImpl,
  };
}
