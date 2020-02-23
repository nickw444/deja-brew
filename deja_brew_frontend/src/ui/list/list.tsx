import * as React from 'react';
import { Link } from 'react-router-dom';
import styles from './list.module.css';

export const List = React.memo(({ children }) => (
    <ul className={styles.list}>{children}</ul>
));

const ListItem = React.memo(({ children }) => (
    <li className={styles.listItem}>{children}</li>
));

export const LinkItem = React.memo(({
  href,
  children,
  onClick,
}: {
  href: string,
  children: React.ReactNode,
  onClick?(): void,
}) => (
    <ListItem>
      <a
          onClick={onClick}
          className={styles.listItemLink}
          href={href}>
        {children}
      </a>
    </ListItem>
));

export const RouterLinkItem = React.memo(({
  to,
  children,
  onClick,
}: {
  to: string,
  children: React.ReactNode,
  onClick?(): void,
}) => (
    <ListItem>
      <Link
          onClick={onClick}
          className={styles.listItemLink}
          to={to}>
        {children}
      </Link>
    </ListItem>
));
