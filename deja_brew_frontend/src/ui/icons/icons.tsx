import classNames from 'classnames';
import React from 'react';
import { ReactComponent as CheckIconSvg } from './assets/check.svg';
import { ReactComponent as ChevronLeftIconSvg } from './assets/chevron_left.svg';
import { ReactComponent as GoogleIconSvg } from './assets/google.svg';
import { ReactComponent as SpinnerIconSvg } from './assets/spinner.svg';
import styles from './icons.module.css';

export type IconSize = 'small' | 'medium' | 'large';

type IconProps = {
  size: IconSize,
  color?: string,
}

export type Icon = React.ComponentType<IconProps>;

const sizeClassMap: Record<IconSize, string> = {
  'small': styles.small,
  'medium': styles.medium,
  'large': styles.large,
};

function createIcon(IconSvg: React.ComponentType) {
  return (props: IconProps) => (
      <span
          style={{ color: props.color }}
          className={classNames(styles.icon, sizeClassMap[props.size])}>
            <IconSvg/>
      </span>
  );
}


export const CheckIcon = createIcon(CheckIconSvg);
export const GoogleIcon = createIcon(GoogleIconSvg);
export const ChevronLeftIcon = createIcon(ChevronLeftIconSvg);
export const SpinnerIcon = createIcon(SpinnerIconSvg);
