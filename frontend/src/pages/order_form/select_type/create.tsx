import { History } from 'history';
import * as mobxReact from 'mobx-react';
import { OrderFlowPresenter, OrderFlowStore } from 'pages/order_form/order_flow_presenter';
import { SelectCoffeeStep } from 'pages/order_form/select_type/select_coffee_step';
import React from 'react';
import { CoffeeType, CoffeeTypeUtil } from 'services/order/order_dto';
import { ButtonSelect } from 'ui/button_select/button_select';
import { labelForCoffeeType } from 'ui/labels/labels';

export function createSelectTypeStep({
  store,
  presenter,
  history,
}: {
  store: OrderFlowStore,
  presenter: OrderFlowPresenter,
  history: History
}) {
  const coffeeSelectOptions = CoffeeTypeUtil.values().map(coffeeType => ({
    label: labelForCoffeeType(coffeeType),
    value: coffeeType,
  }));

  const onCoffeeKindOptionSelected = (value: CoffeeType) => {
    presenter.onCoffeeTypeOptionSelected(store, value);
    history.push("/new-order/select-size");
  };

  const CoffeeKindSelect = mobxReact.observer(() => (
      <ButtonSelect
          options={coffeeSelectOptions}
          onSelect={onCoffeeKindOptionSelected}
      />
  ));

  return () => (
      <SelectCoffeeStep
          CoffeeKindSelect={CoffeeKindSelect}
      />
  );

}
