import classNames from 'classnames';
import React from 'react';
import { Icon } from 'ui/icons/icons';
import styles from './button.module.css';

type IconPosition = 'left' | 'right';

export type ButtonProps = {
  children?: React.ReactNode,
  Icon?: Icon,
  iconPosition?: 'left' | 'right',
  type?: 'submit' | 'button',
  title?: string,
  onClick?(): void,
  disabled?: boolean,
  className?: string,
  stretch?: boolean,
}

type InternalButtonProps = ButtonProps & {
  kind: 'primary' | 'secondary' | 'link' | 'chromeless',
}

const iconClassMap: Record<IconPosition, string> = {
  'left': styles.left,
  'right': styles.right,
};

const Button = React.memo(({
  children,
  type,
  title,
  kind,
  onClick,
  disabled,
  Icon,
  iconPosition = 'left',
  className,
  stretch= true,
}: InternalButtonProps) => {
  return (
      <button
          className={classNames(styles.button, className, {
            [styles.primary]: kind === 'primary',
            [styles.secondary]: kind === 'secondary',
            [styles.link]: kind === 'link',
            [styles.chromeless]: kind === 'chromeless',
            [styles.stretch]: stretch,
          })}
          type={type}
          title={title || children?.toString()}
          onClick={onClick}
          disabled={disabled}
      >
        {Icon && (
            <div className={classNames(styles.iconContainer, iconClassMap[iconPosition])}>
              <Icon size="medium"/>
            </div>
        )}
        <div className={styles.buttonLabel}>{children}</div>
      </button>
  );
});

export const PrimaryButton = (props: ButtonProps) => <Button kind="primary" {...props} />;
export const SecondaryButton = (props: ButtonProps) => <Button kind="secondary" {...props} />;
export const LinkButton = (props: ButtonProps) => <Button kind="link" {...props} />;
