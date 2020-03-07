import classNames from 'classnames';
import React from 'react';
import styles from './alert.module.css';

export enum Style {
  ERROR,
  WARNING,
  INFO
}

const classNameOfStyle: Record<Style, string> = {
  [Style.ERROR]: styles.error,
  [Style.WARNING]: styles.warning,
  [Style.INFO]: styles.info,
};

type Props = {
  style: Style,
  children: React.ReactNode,
}

export const Alert = React.memo(({ children, style }: Props) => (
    <div className={classNames(styles.alert, classNameOfStyle[style])}>
      {children}
    </div>
));
