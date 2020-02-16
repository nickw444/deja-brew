import * as mobx from 'mobx';
import * as mobxReact from 'mobx-react';
import { fromPromise, IPromiseBasedObservable } from 'mobx-utils';
import React from 'react';
import { Redirect } from 'react-router-dom';
import { GetUserInfoRequest, UserInfo } from 'services/user/user_dto';
import { UserService } from 'services/user/user_service';

export class UserInfoStore {
  @mobx.observable.ref
  userInfo: IPromiseBasedObservable<UserInfo> | undefined;
}

export class UserInfoPresenter {
  constructor(
      private readonly userService: UserService,
  ) {
  }

  @mobx.action
  fetchUserInfo(store: UserInfoStore) {
    if (store.userInfo != null) {
      return;
    }

    const p = this.userService.getUserInfo(new GetUserInfoRequest({ id: 'me' }))
        .then(resp => resp.user);
    store.userInfo = fromPromise(p);
  }
}

export const createAuthRequiredHoc = ({
  store,
  onMount,
}: {
  store: UserInfoStore,
  onMount(): void,
}) => (Inner: React.ComponentType) => mobxReact.observer(() => {
  React.useEffect(onMount, []);

  if (store.userInfo == null || store.userInfo.state === 'pending') {
    return <div>Loading...</div>;
  }

  switch (store.userInfo.state) {
    case 'fulfilled':
      return <Inner/>;
    case 'rejected':
      return <Redirect to='/login'/>;
  }
});

export const createAnonOnlyHoc = ({
  store,
}: {
  store: UserInfoStore
}) => (Inner: React.ComponentType) => mobxReact.observer(() => (
    store.userInfo == null || store.userInfo.state !== 'fulfilled'
        ? <Inner/>
        : <Redirect to="/"/>
));

export function createAuthDecorators({
  userService,
}: {
  userService: UserService
}) {
  const userInfoStore = new UserInfoStore();
  const userInfoPresenter = new UserInfoPresenter(userService);

  const withAnonOnly = createAnonOnlyHoc({ store: userInfoStore });
  const withAuthRequired = createAuthRequiredHoc({
    store: userInfoStore,
    onMount: () => userInfoPresenter.fetchUserInfo(userInfoStore),
  });

  return { withAnonOnly, withAuthRequired, userInfoStore };
}
