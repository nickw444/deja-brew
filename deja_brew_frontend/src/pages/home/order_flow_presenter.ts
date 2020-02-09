import { Preconditions, UnreachableError } from 'base/preconditions';
import * as mobx from 'mobx';
import { OrderService } from 'services/order/order_service';
import {
  CoffeeKind,
  CreateOrderRequest,
  Extra,
  Milk,
  Size,
} from 'services/order/order_service_objects';
import { getOrderExtrasLabel, getOrderTypeLabel } from 'ui/labels/labels';

export enum Step {
  SELECT_TYPE,
  SELECT_SIZE,
  CUSTOMIZE,
}

export class OrderFlowStore {
  @mobx.observable.ref
  coffeeKind: CoffeeKind | undefined;

  @mobx.observable.ref
  extraShots: number = 0;

  @mobx.observable.ref
  sugar: number = 0;

  @mobx.observable.ref
  milk: Milk = Milk.REGULAR;

  @mobx.observable.ref
  extras: Extra[] = [];

  @mobx.observable.ref
  size: Size | undefined;

  @mobx.observable.ref
  activeStep: Step = Step.SELECT_TYPE;
}

export class OrderFlowPresenter {
  constructor(
      private readonly orderService: OrderService,
  ) {
  }


  @mobx.action
  onCoffeeKindOptionSelected(store: OrderFlowStore, newValue: CoffeeKind) {
    store.coffeeKind = newValue;
    store.activeStep = Step.SELECT_SIZE;
  }

  @mobx.action
  onSizeOptionSelected(store: OrderFlowStore, newValue: Size) {
    store.size = newValue;
  }

  @mobx.action
  onSugarValueChange(store: OrderFlowStore, newValue: number) {
    store.sugar = newValue;
  }

  @mobx.action
  onExtraShotValueChange(store: OrderFlowStore, newValue: number) {
    store.extraShots = newValue;
  }

  @mobx.action
  onMilkOptionSelected(store: OrderFlowStore, newValue: Milk) {
    store.milk = newValue;
  }

  @mobx.action
  onExtraOptionSelected(store: OrderFlowStore, option: Extra) {
    if (store.extras.includes(option)) {
      store.extras = store.extras.filter(e => e !== option);
    } else {
      store.extras = [...store.extras, option];
    }
  }

  canSubmitOrder(store: OrderFlowStore) {
    return store.size != null && store.coffeeKind != null;
  }

  maybeGetOrderTitle(store: OrderFlowStore) {
    if (store.size == null) {
      return;
    }

    return getOrderTypeLabel({
      extras: store.extras,
      kind: Preconditions.checkExists(store.coffeeKind),
      milk: store.milk,
      size: store.size,
    });
  }

  maybeGetOrderSubtitle(store: OrderFlowStore) {
    return getOrderExtrasLabel(this.getOrderExtras(store));
  }

  @mobx.action
  async submitOrder(store: OrderFlowStore) {
    const resp = await this.orderService.createOrder(new CreateOrderRequest({
      size: Preconditions.checkExists(store.size),
      extras: this.getOrderExtras(store),
      kind: Preconditions.checkExists(store.coffeeKind),
      milk: store.milk,
    }));
    console.log(resp);
  }

  @mobx.action
  customizeOrder(store: OrderFlowStore) {
    store.activeStep = Step.CUSTOMIZE;
  }

  @mobx.action
  goBack(store: OrderFlowStore) {
    switch (store.activeStep) {
      case Step.SELECT_TYPE:
        throw new Error('Cannot go back');
      case Step.SELECT_SIZE:
        store.activeStep = Step.SELECT_TYPE;
        return;
      case Step.CUSTOMIZE:
        store.activeStep = Step.SELECT_SIZE;
        return;
      default:
        throw new UnreachableError(store.activeStep);
    }
  }

  getOrderExtras(store: OrderFlowStore) {
    return [
      ...store.extras,
      ...Array.from({ length: store.extraShots }, () => Extra.EXTRA_SHOT),
      ...Array.from({ length: store.sugar }, () => Extra.SUGAR),
    ]
  }
}
