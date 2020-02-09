import classNames from 'classnames';
import React from 'react';
import styles from './form_ui.module.css';

export const StepGroup = React.memo(({ children }) => (
    <div className={styles.stepGroup}>{children}</div>
));

export const GroupLabel = React.memo(({ children }) => (
    <h2 className={styles.groupLabel}>{children}</h2>
));

const maybeClampMax = (value: number, max: number | undefined) => max != null
    ? Math.min(max, value)
    : value;
const maybeClampMin = (value: number, min: number | undefined) => min != null
    ? Math.max(min, value)
    : value;


export const Stepper = React.memo(({
  onChange,
  value,
  minValue,
  maxValue,
}: {
  onChange(value: number): void,
  value: number,
  maxValue?: number,
  minValue?: number,
}) => {
  const onIncrement = () => onChange(maybeClampMax(value + 1, maxValue));
  const onDecrement = () => onChange(maybeClampMin(value - 1, minValue));
  return (
      <div className={styles.stepper}>
        <button onClick={onDecrement}>-</button>
        <div className={styles.stepperValue}>
          <div className={styles.stepperValueInner}>{value}</div>
        </div>
        <button onClick={onIncrement}>+</button>
      </div>
  );
});

export type Option<T> = {
  label: string,
  value: T,
}
type CardButtonListProps<T> = {
  options: readonly Option<T>[],
  selectedOptions?: readonly T[]
  onSelect(value: T): void,
}

export class CardButtonList<T> extends React.Component<CardButtonListProps<T>> {
  private readonly onOptionClick = (optionValue: T) => {
    this.props.onSelect(optionValue);
  };

  render() {
    const { options, selectedOptions } = this.props;

    return (
        <div className={styles.cardButtonList}>
          {options.map(option => (
              <CardButton
                  key={JSON.stringify(option.value)}
                  value={option.value}
                  onClick={this.onOptionClick}
                  selected={selectedOptions && selectedOptions.includes(option.value)}
                  label={option.label}
              />
          ))}
        </div>
    );
  }
}

type CardButtonProps<T> = {
  value: T,
  label: string,
  onClick(value: T): void,
  selected?: boolean,
}

class CardButton<T> extends React.Component<CardButtonProps<T>> {
  private readonly onClick = () => {
    this.props.onClick(this.props.value);
  };

  render() {
    const { selected, label } = this.props;
    return (
        <button
            className={classNames(styles.cardButton, {
              [styles.selected]: selected,
            })}
            onClick={this.onClick}>
          {label}
        </button>
    );
  }
}
