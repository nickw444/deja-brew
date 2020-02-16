import * as React from 'react';
import { Link } from 'react-router-dom';
import { Routes } from 'routes/routes';
import { UserInfo } from 'services/user/user_dto';
import { ChromelessButton } from 'ui/button/button';
import { ChevronLeftIcon } from 'ui/icons/icons';
import styles from './header.module.css';


export const Header = React.memo(({
  userInfo,
  onBackClick,
}: {
  userInfo: UserInfo | undefined
  onBackClick?(): void,
}) => {
  return (
      <header className={styles.header}>
        {onBackClick && (
            <ChromelessButton
                stretch={false}
                className={styles.backButton}
                onClick={() => void 0}
                Icon={ChevronLeftIcon}
                title="Back"/>
        )}
        <Link to={Routes.home()} className={styles.appLogo}>Déjà Brew</Link>
        {userInfo && (
            <div className={styles.profile}>
              {userInfo.avatarUrl && (
                  <img
                      className={styles.avatarImg}
                      src={userInfo.avatarUrl}
                      alt="User profile image"/>
              )}
            </div>
        )}
      </header>
  );
});
