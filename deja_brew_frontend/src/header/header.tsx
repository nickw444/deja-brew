import * as React from 'react';
import { User } from 'services/order/order_service_objects';
import styles from './header.module.css';

export const Header = React.memo(({
  userInfo,
}: {
  userInfo: User | undefined
}) => (
    <header className={styles.header}>
      <div className={styles.appLogo}>Deja-Brew</div>
      {userInfo && (
          <div className={styles.profile}>
            {userInfo.avatarUrl && <img src={userInfo.avatarUrl}/>}
            {userInfo.name}
          </div>
      )}
    </header>
));
