import * as React from 'react';
import { Link } from 'react-router-dom';
import { Routes } from 'routes/routes';
import { UserInfo } from 'services/user/user_dto';
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
        <div className={styles.holder}>
          {onBackClick && (
              <button
                  className={styles.backButton}
                  onClick={() => void 0}
                  title="Back">
                <ChevronLeftIcon size="medium"/>
              </button>
          )}
        </div>
        <Link to={Routes.home()} className={styles.appLogo}>Déjà Brew</Link>
        <div className={styles.holder}>
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
        </div>
      </header>
  );
});
