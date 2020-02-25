import React from 'react';
import styles from './panel.module.css';

export const Panel = React.memo(({ children }) => (
    <div className={styles.panel}>
      {children}
    </div>
));
