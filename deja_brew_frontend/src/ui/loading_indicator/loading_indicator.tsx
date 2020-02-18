import classNames from 'classnames';
import React from 'react';
import { IconSize, SpinnerIcon } from 'ui/icons/icons';
import styles from './loading_indicator.module.css';

export const LoadingIndicator = React.memo(({
  stretch = false,
  size = 'large',
}: {
  stretch?: boolean
  size?: IconSize,
}) => {
  return (
      <div className={classNames(styles.loadingIndicator, {
        [styles.stretch]: stretch,
      })}>
        <SpinnerIcon size={size}/>
      </div>
  );
});
