import * as mobxReact from 'mobx-react';
import React from 'react';
import { Redirect } from 'react-router-dom';
import { Routes } from 'routes/routes';
import { Role, UserInfo } from 'services/user/user_dto';


export const createAuthRequiredHoc = ({
  user,
}: {
  user: UserInfo | undefined
}) => (Inner: React.ComponentType, permittedRole?: Role) => mobxReact.observer(() => {
  if (user == null) {
    return <Redirect to={getInitialRoute(user)}/>;
  }

  if (permittedRole == null || user.roles.includes(permittedRole)) {
    return <Inner/>;
  }
  return <div>You don't have permission to view this page</div>;
});

export const createAnonOnlyHoc = ({
  user,
}: {
  user: UserInfo | undefined
}) => (Inner: React.ComponentType) => mobxReact.observer(() => (
    user == null
        ? <Inner/>
        : <Redirect to={getInitialRoute(user)}/>
));

export function createAuthDecorators({
  user,
}: {
  user: UserInfo | undefined
}) {
  const withAnonOnly = createAnonOnlyHoc({ user });
  const withAuthRequired = createAuthRequiredHoc({ user });
  return { withAnonOnly, withAuthRequired };
}

export function getInitialRoute(user: UserInfo | undefined) {
  if (!user) {
    return Routes.login();
  }

  if (isUserCafeStaff(user)) {
    return Routes.orders();
  }

  return Routes.home();
}

export function isUserCafeStaff(user: UserInfo | undefined) {
  return user?.roles.includes(Role.CAFE_STAFF);
}
