import { UnreachableError } from 'base/preconditions';
import * as mobxReact from 'mobx-react';
import { CardButtonList, Stepper } from 'pages/home/form_ui';
import { OrderFlowPresenter, OrderFlowStore, Step } from 'pages/home/order_flow_presenter';
import { CustomizeStep } from 'pages/home/steps/customize_step';
import { SelectCoffeeStep } from 'pages/home/steps/select_coffee_step';
import { SelectSizeStep } from 'pages/home/steps/select_size_step';
import { OrderCard } from 'pages/orders/order_card';
import React from 'react';
import { OrderService } from 'services/order/order_service';
import {
  CoffeeKind,
  CoffeeKindUtil,
  Extra,
  Milk,
  MilkUtil,
  Order,
  Size,
  SizeUtil,
  User,
} from 'services/order/order_service_objects';
import { PrimaryButton } from 'ui/button/button';
import { Container } from 'ui/container/container';
import { Divider } from 'ui/divider/divider';
import { labelForCoffeeKind, labelForExtra, labelForMilk, labelForSize } from 'ui/labels/labels';


export function createHomePage({
  orderService,
}: {
  orderService: OrderService,
}) {
  const store = new OrderFlowStore();
  const presenter = new OrderFlowPresenter(orderService);

  const onSugarValueChange = (value: number) => presenter.onSugarValueChange(store, value);
  const onExtraShotValueChange = (value: number) => presenter.onExtraShotValueChange(store, value);
  const onMilkOptionSelected = (value: Milk) => presenter.onMilkOptionSelected(store, value);
  const onCoffeeKindOptionSelected = (value: CoffeeKind) =>
      presenter.onCoffeeKindOptionSelected(store, value);
  const onSizeOptionSelected = (value: Size) =>
      presenter.onSizeOptionSelected(store, value);
  const onExtraOptionSelected = (value: Extra) => presenter.onExtraOptionSelected(store, value);

  const onBackClick = () => presenter.goBack(store);

  const onSubmitClick = () => presenter.submitOrder(store);
  const onCustomizeClick = () => presenter.customizeOrder(store);

  const milkSelectOptions = MilkUtil.values().map(milkType => ({
    label: labelForMilk(milkType),
    value: milkType,
  }));
  const extrasSelectOptions = [Extra.DECAF, Extra.HONEY].map(extra => ({
    label: labelForExtra(extra),
    value: extra,
  }));
  const coffeeSelectOptions = CoffeeKindUtil.values().map(coffeeKind => ({
    label: labelForCoffeeKind(coffeeKind),
    value: coffeeKind,
  }));
  const sizeSelectOptions = SizeUtil.values().map(size => ({
    label: labelForSize(size),
    value: size,
  }));

  const SugarStepper = mobxReact.observer(() =>
      <Stepper onChange={onSugarValueChange} value={store.sugar} minValue={0}/>);
  const ExtraShotStepper = mobxReact.observer(() =>
      <Stepper onChange={onExtraShotValueChange} value={store.extraShots} minValue={0}/>);
  const MilkSelect = mobxReact.observer(() =>
      <CardButtonList
          options={milkSelectOptions}
          onSelect={onMilkOptionSelected}
          selectedOptions={[store.milk]}
      />,
  );
  const ExtrasSelect = mobxReact.observer(() => (
      <CardButtonList
          options={extrasSelectOptions}
          onSelect={onExtraOptionSelected}
          selectedOptions={store.extras}
      />
  ));

  const CoffeeKindSelect = mobxReact.observer(() => (
      <CardButtonList
          options={coffeeSelectOptions}
          onSelect={onCoffeeKindOptionSelected}
      />
  ));

  const SizeSelect = mobxReact.observer(() =>
      <CardButtonList
          options={sizeSelectOptions}
          onSelect={onSizeOptionSelected}
          selectedOptions={store.size != null ? [store.size] : undefined}
      />,
  );

  const ActiveStep = mobxReact.observer(() => {
    switch (store.activeStep) {
      case Step.SELECT_TYPE:
        return <SelectCoffeeStep CoffeeKindSelect={CoffeeKindSelect}/>;
      case Step.SELECT_SIZE:
        return <SelectSizeStep
            SizeSelect={SizeSelect}
            onSubmitClick={onSubmitClick}
            onCustomizeClick={onCustomizeClick}
            canSubmitOrder={presenter.canSubmitOrder(store)}
            onBackClick={onBackClick}
            orderTitle={presenter.maybeGetOrderTitle(store)}
        />;
      case Step.CUSTOMIZE:
        return (
            <CustomizeStep
                SugarStepper={SugarStepper}
                ExtraShotStepper={ExtraShotStepper}
                MilkSelect={MilkSelect}
                ExtrasSelect={ExtrasSelect}
                onSubmitClick={onSubmitClick}
                canSubmitOrder={presenter.canSubmitOrder(store)}
                onBackClick={onBackClick}
                orderTitle={presenter.maybeGetOrderTitle(store)}
                orderSubtitle={presenter.maybeGetOrderSubtitle(store)}
            />
        );
      default:
        throw new UnreachableError(store.activeStep);
    }
  });

  const HomePage = mobxReact.observer(() => (
      <div>
        <Container>
          {store.activeStep === Step.SELECT_TYPE && (
              <>
                <div style={{ margin: '16px 0' }}>
                  <OrderCard
                      showUser={false}
                      order={new Order({
                        id: 'OAAAAAA',
                        completed: false,
                        size: Size.SMALL,
                        kind: CoffeeKind.ESPRESSO,
                        extras: [Extra.EXTRA_SHOT, Extra.SUGAR],
                        milk: Milk.REGULAR,
                        user: new User({
                          id: 'UAAAAAA',
                          name: 'Nick Whyte',
                        }),
                      })}/>
                </div>
                <div style={{ margin: '16px 0' }}>
                  <PrimaryButton>Re-order</PrimaryButton>
                </div>
                <div style={{ margin: '16px 0' }}>
                  <Divider>OR</Divider>
                </div>
              </>
          )}
          <ActiveStep/>
        </Container>
      </div>
  ));
  return { HomePage };
}
