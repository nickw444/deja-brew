import React from 'react';
import { SecondaryButton } from 'ui/button/button';
import { CheckIcon } from 'ui/icons/icons';
import styles from './button_select.module.css';

export type Option<T> = {
  label: string,
  value: T,
}
type ButtonSelectProps<T> = {
  options: readonly Option<T>[],
  selectedOptions?: readonly T[]
  onSelect(value: T): void,
}

export class ButtonSelect<T> extends React.Component<ButtonSelectProps<T>> {
  private readonly onOptionClick = (optionValue: T) => {
    this.props.onSelect(optionValue);
  };

  render() {
    const { options, selectedOptions } = this.props;

    return (
        <div className={styles.buttonSelect}>
          {options.map(option => (
              <SelectableButton
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

type SelectableButtonProps<T> = {
  value: T,
  label: string,
  onClick(value: T): void,
  selected?: boolean,
}

class SelectableButton<T> extends React.Component<SelectableButtonProps<T>> {
  private readonly onClick = () => {
    this.props.onClick(this.props.value);
  };

  render() {
    const { selected, label } = this.props;
    return (
        <SecondaryButton
            Icon={selected ? CheckIcon : undefined}
            iconPosition="right"
            onClick={this.onClick}
        >
          {label}
        </SecondaryButton>
    );
  }
}
