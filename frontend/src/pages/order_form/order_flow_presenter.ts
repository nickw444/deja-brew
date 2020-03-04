import { Preconditions } from 'base/preconditions';
import { History } from 'history';
import * as mobx from 'mobx';
import { fromPromise, IPromiseBasedObservable } from 'mobx-utils';
import { Routes } from 'routes/routes';
import {
  CoffeeType,
  CreateOrderRequest,
  CreateOrderResponse,
  CupSize,
  Extra,
  MilkType,
} from 'services/order/order_dto';
import { OrderService } from 'services/order/order_service';
import { OrderInfo } from 'ui/order_tile/order_tile';


export enum Step {
  WELCOME,
  SELECT_TYPE,
  SELECT_SIZE,
  CUSTOMIZE,
}

export class OrderFlowStore {
  @mobx.observable.ref
  coffeeType: CoffeeType | undefined;

  @mobx.observable.ref
  extraShots: number = 0;

  @mobx.observable.ref
  sugar: number = 0;

  @mobx.observable.ref
  milkType: MilkType = MilkType.REGULAR;

  @mobx.observable.ref
  extras: Extra[] = [];

  @mobx.observable.ref
  cupSize: CupSize | undefined;

  @mobx.observable.ref
  createOrderReq: IPromiseBasedObservable<CreateOrderResponse> | undefined;
}

export class OrderFlowPresenter {
  constructor(
      private readonly orderService: OrderService,
      private readonly history: History,
      private readonly refreshOrders: () => Promise<void>,
  ) {
  }

  @mobx.action
  resetOrder(store: OrderFlowStore) {
    store.coffeeType = undefined;
    store.extraShots = 0;
    store.sugar = 0;
    store.milkType = MilkType.REGULAR;
    store.extras = [];
    store.cupSize = undefined;
  }

  @mobx.action
  onCoffeeTypeOptionSelected(store: OrderFlowStore, newValue: CoffeeType) {
    store.coffeeType = newValue;
  }

  @mobx.action
  onSizeOptionSelected(store: OrderFlowStore, newValue: CupSize) {
    store.cupSize = newValue;
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
  onMilkOptionSelected(store: OrderFlowStore, newValue: MilkType) {
    store.milkType = newValue;
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
    return store.cupSize != null && store.coffeeType != null
        && !this.isSubmitting(store);
  }

  maybeGetOrderInfo(store: OrderFlowStore): OrderInfo | undefined {
    if (store.cupSize == null) {
      return;
    }

    if (store.coffeeType == null) {
      return;
    }

    return {
      cupSize: store.cupSize,
      extras: this.getOrderExtras(store),
      coffeeType: store.coffeeType,
      milkType: store.milkType,
    };
  }

  @mobx.action
  async submitOrder(store: OrderFlowStore) {
    store.createOrderReq = fromPromise(this.orderService.createOrder(new CreateOrderRequest({
      cupSize: Preconditions.checkExists(store.cupSize),
      extras: this.getOrderExtras(store),
      coffeeType: Preconditions.checkExists(store.coffeeType),
      milkType: store.milkType,
    })));
    await store.createOrderReq;
    this.history.push(Routes.home());
    await this.refreshOrders();
  }

  isSubmitting(store: OrderFlowStore) {
    return store.createOrderReq?.state === 'pending';
  }

  getErrorMessage(store: OrderFlowStore) {
    return store.createOrderReq?.state === 'rejected' && store.createOrderReq.value.toString();
  }

  @mobx.action
  customizeOrder(store: OrderFlowStore) {
    this.history.push(Routes.newOrder('customize'));
  }

  getOrderExtras(store: OrderFlowStore) {
    return [
      ...store.extras,
      ...Array.from({ length: store.extraShots }, () => Extra.EXTRA_SHOT),
      ...Array.from({ length: store.sugar }, () => Extra.SUGAR),
    ];
  }
}
