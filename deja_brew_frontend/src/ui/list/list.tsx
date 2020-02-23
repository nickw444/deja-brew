import styles from 'header/header.module.css';
import * as React from 'react';
import { Link } from 'react-router-dom';

export const List = React.memo(({ children }) => (
    <ul className={styles.list}>{children}</ul>
));

const ListItem = React.memo(({ children }) => (
    <li className={styles.listItem}>{children}</li>
));

export const LinkItem = React.memo(({
  href,
  children,
}: {
  href: string,
  children: React.ReactNode
}) => (
    <ListItem>
      <a
          className={styles.listItemLink}
          href={href}>
        {children}
      </a>
    </ListItem>
));

export const RouterLinkItem = React.memo(({
  to,
  children,
}: {
  to: string,
  children: React.ReactNode
}) => (
    <ListItem>
      <Link
          className={styles.listItemLink}
          to={to}>
        {children}
      </Link>
    </ListItem>
));
