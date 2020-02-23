import classNames from 'classnames';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { AdminRoutes } from 'routes/admin_routes';
import { CustomerRoutes } from 'routes/customer_routes';
import { LoginRoutes } from 'routes/login_routes';
import { UserInfo } from 'services/user/user_dto';
import { MenuIcon } from 'ui/icons/icons';
import { LinkItem, List, RouterLinkItem } from 'ui/list/list';
import styles from './header.module.css';


export const Header = React.memo(({
  userInfo,
}: {
  userInfo: UserInfo | undefined
}) => {
  return (
      <header className={styles.header}>
        <div className={styles.holder}></div>
        <Link to={CustomerRoutes.index()} className={styles.appLogo}>Déjà Brew</Link>
        <div className={styles.holder}>
          <button className={styles.button}><MenuIcon size="medium"/></button>
          <SideMenu userInfo={userInfo} open={true} onClose={() => void 0}/>
        </div>
      </header>
  );
});

const SideMenu = React.memo(({
  userInfo,
  open,
  onClose,
}: {
  userInfo: UserInfo | undefined,
  open: boolean,
  onClose(): void,
}) => (
    <div className={classNames(styles.sideMenu, open && styles.open)}>
      <div className={styles.sideMenuBg} onClick={onClose}/>
      <div className={styles.drawer}>
        <div className={styles.closeButton}>
          <MenuIcon size="medium"/>
        </div>
        {userInfo && (
            <div className={styles.userInfo}>
              {userInfo.avatarUrl && (
                  <img
                      className={styles.avatarImg}
                      src={userInfo.avatarUrl}
                      alt="User profile"/>
              )}
              {userInfo.name && <div className={styles.userName}>{userInfo.name}</div>}
            </div>
        )}
        <div className={styles.drawerMenu}>
          <List>
            <RouterLinkItem to={CustomerRoutes.index()}>Home</RouterLinkItem>
            <RouterLinkItem to={CustomerRoutes.newOrder()}>New Order</RouterLinkItem>
            <RouterLinkItem to={CustomerRoutes.orderHistory()}>Order History</RouterLinkItem>
          </List>
        </div>
        <List>
          <LinkItem href={AdminRoutes.index()}>Admin</LinkItem>
          <LinkItem href={LoginRoutes.logout()}>Log out</LinkItem>
        </List>
      </div>
    </div>
));


