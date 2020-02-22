import * as mobxReact from 'mobx-react';
import { OrderFlowPresenter, OrderFlowStore } from 'pages/order_form/order_flow_presenter';
import React from 'react';
import { CupSize, CupSizeUtil } from 'services/order/order_dto';
import { ButtonSelect } from 'ui/button_select/button_select';
import { labelForSize } from 'ui/labels/labels';
import { SelectSizeStep } from './select_size_step';

export function createSelectSizeStep({
  store,
  presenter,
}: {
  store: OrderFlowStore,
  presenter: OrderFlowPresenter,
}) {
  const onSubmitClick = () => presenter.submitOrder(store);
  const onCustomizeClick = () => presenter.customizeOrder(store);
  const onSizeOptionSelected = (value: CupSize) =>
      presenter.onSizeOptionSelected(store, value);

  const sizeSelectOptions = CupSizeUtil.values().map(size => ({
    label: labelForSize(size),
    value: size,
  }));

  const SizeSelect = mobxReact.observer(() =>
      <ButtonSelect
          options={sizeSelectOptions}
          onSelect={onSizeOptionSelected}
          selectedOptions={store.cupSize != null ? [store.cupSize] : undefined}
      />,
  );

  return mobxReact.observer(() => (
      <SelectSizeStep
          SizeSelect={SizeSelect}
          onSubmitClick={onSubmitClick}
          onCustomizeClick={onCustomizeClick}
          canSubmitOrder={presenter.canSubmitOrder(store)}
          isSubmitting={presenter.isSubmitting(store)}
          orderInfo={presenter.maybeGetOrderInfo(store)}
      />
  ));

}
