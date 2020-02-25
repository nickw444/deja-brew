import React from 'react';
import styles from './row.module.css';

export const Row = React.memo(({ children }) => (
    <div className={styles.row}>{children}</div>
));
