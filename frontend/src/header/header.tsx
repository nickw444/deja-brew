import { isUserCafeStaff } from 'auth/auth_helpers';
import classNames from 'classnames';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import { Routes } from 'routes/routes';
import { UserInfo } from 'services/user/user_dto';
import { MenuIcon } from 'ui/icons/icons';
import { LinkItem, List, RouterLinkItem } from 'ui/list/list';
import styles from './header.module.css';


export const Header = React.memo(({
  userInfo,
}: {
  userInfo: UserInfo | undefined,
}) => {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const toggleMenu = React.useCallback(() => setMenuOpen(!menuOpen), [menuOpen]);

  return (
      <header className={styles.header}>
        <div className={styles.holder}></div>
        <Link to={Routes.home()} className={styles.appLogo}>Déjà Brew</Link>
        <div className={styles.holder}>
          {userInfo && (
              <>
                <button className={styles.button} onClick={toggleMenu}>
                  <MenuIcon size="medium"/>
                </button>
                <SideMenu userInfo={userInfo} open={menuOpen} onClose={toggleMenu}/>
              </>
          )}
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
    <CSSTransition
        mountOnEnter={true}
        unmountOnExit={true}
        timeout={200}
        in={open}
        classNames={{
          enter: styles.enter,
          enterActive: styles.enterActive,
          enterDone: 'enterDone',
          exitActive: styles.exitActive,
          exit: styles.exit,
          exitDone: styles.exitDone,
        }}
    >
      <div className={classNames(styles.sideMenu)}>
        <div className={styles.sideMenuBg} onClick={onClose}/>
        <div className={styles.drawer}>
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
              <RouterLinkItem to={Routes.home()} onClick={onClose}>My
                Orders</RouterLinkItem>
              <RouterLinkItem to={Routes.newOrder()} onClick={onClose}>New
                Order</RouterLinkItem>
            </List>
          </div>
          <List>
            {isUserCafeStaff(userInfo) && (
                <RouterLinkItem to={Routes.orders()} onClick={onClose}>Admin</RouterLinkItem>
            )}
            <LinkItem href={Routes.logout()} onClick={onClose}>Log out</LinkItem>
          </List>
        </div>
      </div>
    </CSSTransition>
));

