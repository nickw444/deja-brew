import React from 'react';
import styles from './container.module.css';

export const Container = React.memo(({ children }) => (
    <div className={styles.container}>{children}</div>
));
