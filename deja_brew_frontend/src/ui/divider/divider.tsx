import classNames from 'classnames';
import React from 'react';
import styles from './divider.module.css';

export const Divider = React.memo(({ children }) => (
    <div className={classNames(styles.divider, children && styles.withText)}>
      {children}
    </div>
));
