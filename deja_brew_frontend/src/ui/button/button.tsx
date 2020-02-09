import classNames from 'classnames';
import React from 'react';
import styles from './button.module.css';

export type ButtonProps = {
  children: React.ReactNode,
  type?: 'submit' | 'button',
  title?: string,
  onClick?(): void,
  disabled?: boolean,
  iconSrc?: string,
}

type InternalButtonProps = ButtonProps & {
  kind: 'primary' | 'secondary' | 'link',
}

const Button = React.memo(({
  children,
  type,
  title,
  kind,
  onClick,
  disabled,
  iconSrc,
}: InternalButtonProps) => (
    <button
        className={classNames(styles.button, {
          [styles.primary]: kind === 'primary',
          [styles.secondary]: kind === 'secondary',
          [styles.link]: kind === 'link',
        })}
        type={type}
        title={title || children?.toString()}
        onClick={onClick}
        disabled={disabled}
    >
      {iconSrc && (
          <div className={styles.iconContainer}>
            <img src={iconSrc}/>
          </div>
      )}
      <div className={styles.buttonLabel}>{children}</div>
    </button>
));

export const PrimaryButton = (props: ButtonProps) => <Button kind="primary" {...props} />;
export const SecondaryButton = (props: ButtonProps) => <Button kind="secondary" {...props} />;
export const LinkButton = (props: ButtonProps) => <Button kind="link" {...props} />;
