import React from 'react';
import styles from './typography.module.css';

export const TitleMedium = React.memo(({ children }) => (
    <h3 className={styles.titleMedium}>{children}</h3>
));

export const TitleSmall = React.memo(({ children }) => (
    <h4 className={styles.titleSmall}>{children}</h4>
));


export const Paragraph = React.memo(({ children }) => (
    <p className={styles.paragraph}>{children}</p>
));
