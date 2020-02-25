import React from 'react';
import { SecondaryButton } from 'ui/button/button';
import styles from './stepper.module.css';


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
        <SecondaryButton onClick={onDecrement} className={styles.button}>-</SecondaryButton>
        <div className={styles.stepperValue}>
          <div className={styles.stepperValueInner}>{value}</div>
        </div>
        <SecondaryButton onClick={onIncrement} className={styles.button}>+</SecondaryButton>
      </div>
  );
});
