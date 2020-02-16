import * as mobxReact from 'mobx-react';
import { OrderFlowPresenter, OrderFlowStore } from 'pages/order_form/order_flow_presenter';
import React from 'react';
import { Extra, MilkType, MilkTypeUtil } from 'services/order/order_dto';
import { ButtonSelect } from 'ui/button_select/button_select';
import { labelForExtra, labelForMilk } from 'ui/labels/labels';
import { Stepper } from 'ui/stepper/stepper';
import { CustomizeStep } from './customize_step';

export function createCustomizeStep({
  store,
  presenter,
}: {
  store: OrderFlowStore,
  presenter: OrderFlowPresenter,
}) {
  const onSugarValueChange = (value: number) => presenter.onSugarValueChange(store, value);
  const onExtraShotValueChange = (value: number) => presenter.onExtraShotValueChange(store, value);
  const onMilkOptionSelected = (value: MilkType) => presenter.onMilkOptionSelected(store, value);
  const onExtraOptionSelected = (value: Extra) => presenter.onExtraOptionSelected(store, value);

  const onSubmitClick = () => presenter.submitOrder(store);

  const milkSelectOptions = MilkTypeUtil.values().map(milkType => ({
    label: labelForMilk(milkType),
    value: milkType,
  }));
  const extrasSelectOptions = [Extra.DECAF, Extra.HONEY].map(extra => ({
    label: labelForExtra(extra),
    value: extra,
  }));

  const SugarStepper = mobxReact.observer(() =>
      <Stepper onChange={onSugarValueChange} value={store.sugar} minValue={0}/>);
  const ExtraShotStepper = mobxReact.observer(() =>
      <Stepper onChange={onExtraShotValueChange} value={store.extraShots} minValue={0}/>);
  const MilkSelect = mobxReact.observer(() =>
      <ButtonSelect
          options={milkSelectOptions}
          onSelect={onMilkOptionSelected}
          selectedOptions={[store.milkType]}
      />,
  );
  const ExtrasSelect = mobxReact.observer(() => (
      <ButtonSelect
          options={extrasSelectOptions}
          onSelect={onExtraOptionSelected}
          selectedOptions={store.extras}
      />
  ));

  return mobxReact.observer(() => (
      <CustomizeStep
          SugarStepper={SugarStepper}
          ExtraShotStepper={ExtraShotStepper}
          MilkSelect={MilkSelect}
          ExtrasSelect={ExtrasSelect}
          onSubmitClick={onSubmitClick}
          canSubmitOrder={presenter.canSubmitOrder(store)}
          orderInfo={presenter.maybeGetOrderInfo(store)}
      />
  ));
}
