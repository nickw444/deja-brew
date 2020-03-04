import React from 'react';
import { CoffeeIcon, Icon } from 'ui/icons/icons';
import styles from './status_panel.module.css';

export const StatusPanel = React.memo(({
  Icon = CoffeeIcon,
  children,
}: {
  children: React.ReactNode,
  Icon?: Icon,
}) => (
    <div className={styles.statusPanel}>
      <Icon size="large"/>
      <p>{children}</p>
    </div>
));
