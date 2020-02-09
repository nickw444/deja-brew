import * as React from 'react';
import styles from './header.module.css';

export const Header = React.memo(() => (
    <header className={styles.header}>
      <div className={styles.appLogo}>Deja-Brew</div>
    </header>
));
