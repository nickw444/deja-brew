import React from 'react';
import styles from './divider.module.css';

export const Divider = React.memo(({ children }) => (
    <div className={styles.divider}>
      {children}
    </div>
));
