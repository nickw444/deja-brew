// @formatter:off
import { Serialization } from 'base/serialization';
import { UnreachableError } from 'base/preconditions';
import { Deserialization } from 'base/deserialization';

export enum CupSize {
  SMALL,
  MEDIUM,
  LARGE,
}

export const CupSizeUtil = {
  deserialize(value: string): CupSize {
    switch(value) {
      case 'SMALL': return CupSize.SMALL;
      case 'MEDIUM': return CupSize.MEDIUM;
      case 'LARGE': return CupSize.LARGE;
      default: throw new Error('Unknown value: ' + value)
    }
  },
  serialize(value: CupSize): string {
    switch(value) {
      case CupSize.SMALL: return 'SMALL';
      case CupSize.MEDIUM: return 'MEDIUM';
      case CupSize.LARGE: return 'LARGE';
      default: throw new UnreachableError(value)
    } 
  },
  values(): CupSize[] {
    return [
      CupSize.SMALL,
      CupSize.MEDIUM,
      CupSize.LARGE,
    ]
  }
};

export enum CoffeeType {
  LATTE,
  CAPPUCCINO,
  FLAT_WHITE,
  LONG_BLACK,
  MOCHA,
  HOT_CHOC,
  MATCHA,
  ESPRESSO,
}

export const CoffeeTypeUtil = {
  deserialize(value: string): CoffeeType {
    switch(value) {
      case 'LATTE': return CoffeeType.LATTE;
      case 'CAPPUCCINO': return CoffeeType.CAPPUCCINO;
      case 'FLAT_WHITE': return CoffeeType.FLAT_WHITE;
      case 'LONG_BLACK': return CoffeeType.LONG_BLACK;
      case 'MOCHA': return CoffeeType.MOCHA;
      case 'HOT_CHOC': return CoffeeType.HOT_CHOC;
      case 'MATCHA': return CoffeeType.MATCHA;
      case 'ESPRESSO': return CoffeeType.ESPRESSO;
      default: throw new Error('Unknown value: ' + value)
    }
  },
  serialize(value: CoffeeType): string {
    switch(value) {
      case CoffeeType.LATTE: return 'LATTE';
      case CoffeeType.CAPPUCCINO: return 'CAPPUCCINO';
      case CoffeeType.FLAT_WHITE: return 'FLAT_WHITE';
      case CoffeeType.LONG_BLACK: return 'LONG_BLACK';
      case CoffeeType.MOCHA: return 'MOCHA';
      case CoffeeType.HOT_CHOC: return 'HOT_CHOC';
      case CoffeeType.MATCHA: return 'MATCHA';
      case CoffeeType.ESPRESSO: return 'ESPRESSO';
      default: throw new UnreachableError(value)
    } 
  },
  values(): CoffeeType[] {
    return [
      CoffeeType.LATTE,
      CoffeeType.CAPPUCCINO,
      CoffeeType.FLAT_WHITE,
      CoffeeType.LONG_BLACK,
      CoffeeType.MOCHA,
      CoffeeType.HOT_CHOC,
      CoffeeType.MATCHA,
      CoffeeType.ESPRESSO,
    ]
  }
};

export enum MilkType {
  REGULAR,
  SKIM,
  SOY,
  ALMOND,
  OAT,
}

export const MilkTypeUtil = {
  deserialize(value: string): MilkType {
    switch(value) {
      case 'REGULAR': return MilkType.REGULAR;
      case 'SKIM': return MilkType.SKIM;
      case 'SOY': return MilkType.SOY;
      case 'ALMOND': return MilkType.ALMOND;
      case 'OAT': return MilkType.OAT;
      default: throw new Error('Unknown value: ' + value)
    }
  },
  serialize(value: MilkType): string {
    switch(value) {
      case MilkType.REGULAR: return 'REGULAR';
      case MilkType.SKIM: return 'SKIM';
      case MilkType.SOY: return 'SOY';
      case MilkType.ALMOND: return 'ALMOND';
      case MilkType.OAT: return 'OAT';
      default: throw new UnreachableError(value)
    } 
  },
  values(): MilkType[] {
    return [
      MilkType.REGULAR,
      MilkType.SKIM,
      MilkType.SOY,
      MilkType.ALMOND,
      MilkType.OAT,
    ]
  }
};

export enum Extra {
  DECAF,
  EXTRA_SHOT,
  HONEY,
  ICED,
  SUGAR,
}

export const ExtraUtil = {
  deserialize(value: string): Extra {
    switch(value) {
      case 'DECAF': return Extra.DECAF;
      case 'EXTRA_SHOT': return Extra.EXTRA_SHOT;
      case 'HONEY': return Extra.HONEY;
      case 'ICED': return Extra.ICED;
      case 'SUGAR': return Extra.SUGAR;
      default: throw new Error('Unknown value: ' + value)
    }
  },
  serialize(value: Extra): string {
    switch(value) {
      case Extra.DECAF: return 'DECAF';
      case Extra.EXTRA_SHOT: return 'EXTRA_SHOT';
      case Extra.HONEY: return 'HONEY';
      case Extra.ICED: return 'ICED';
      case Extra.SUGAR: return 'SUGAR';
      default: throw new UnreachableError(value)
    } 
  },
  values(): Extra[] {
    return [
      Extra.DECAF,
      Extra.EXTRA_SHOT,
      Extra.HONEY,
      Extra.ICED,
      Extra.SUGAR,
    ]
  }
};

export enum OrderStatus {
  PENDING,
  ACCEPTED,
  READY,
  CANCELLED,
}

export const OrderStatusUtil = {
  deserialize(value: string): OrderStatus {
    switch(value) {
      case 'PENDING': return OrderStatus.PENDING;
      case 'ACCEPTED': return OrderStatus.ACCEPTED;
      case 'READY': return OrderStatus.READY;
      case 'CANCELLED': return OrderStatus.CANCELLED;
      default: throw new Error('Unknown value: ' + value)
    }
  },
  serialize(value: OrderStatus): string {
    switch(value) {
      case OrderStatus.PENDING: return 'PENDING';
      case OrderStatus.ACCEPTED: return 'ACCEPTED';
      case OrderStatus.READY: return 'READY';
      case OrderStatus.CANCELLED: return 'CANCELLED';
      default: throw new UnreachableError(value)
    } 
  },
  values(): OrderStatus[] {
    return [
      OrderStatus.PENDING,
      OrderStatus.ACCEPTED,
      OrderStatus.READY,
      OrderStatus.CANCELLED,
    ]
  }
};

export class Order {
  readonly milkType: MilkType;
  readonly id: string;
  readonly createdAt: number;
  readonly status: OrderStatus;
  readonly userId: string;
  readonly coffeeType: CoffeeType;
  readonly extras: Extra[];
  readonly cupSize: CupSize;
  constructor({
    milkType,
    id,
    createdAt,
    status,
    userId,
    coffeeType,
    extras,
    cupSize,  
  }: {
    milkType: MilkType,
    id: string,
    createdAt: number,
    status: OrderStatus,
    userId: string,
    coffeeType: CoffeeType,
    extras: Extra[],
    cupSize: CupSize,  
  }) {
    this.milkType = milkType;
    this.id = id;
    this.createdAt = createdAt;
    this.status = status;
    this.userId = userId;
    this.coffeeType = coffeeType;
    this.extras = extras;
    this.cupSize = cupSize;
  }
  
  static deserialize(o: any): Order {
    return new Order({
      milkType: Deserialization.requiredEnum(MilkTypeUtil.deserialize, o, 'milkType'),
      id: Deserialization.requiredString(o, 'id'),
      createdAt: Deserialization.requiredNumber(o, 'createdAt'),
      status: Deserialization.requiredEnum(OrderStatusUtil.deserialize, o, 'status'),
      userId: Deserialization.requiredString(o, 'userId'),
      coffeeType: Deserialization.requiredEnum(CoffeeTypeUtil.deserialize, o, 'coffeeType'),
      extras: Deserialization.repeatedEnum(ExtraUtil.deserialize, o, 'extras'),
      cupSize: Deserialization.requiredEnum(CupSizeUtil.deserialize, o, 'cupSize'),  
    })
  }
  
  static serialize(o: Order): object {
    return {
      'milkType': Serialization.requiredEnum(MilkTypeUtil.serialize, o.milkType),
      'id': o.id,
      'createdAt': o.createdAt,
      'status': Serialization.requiredEnum(OrderStatusUtil.serialize, o.status),
      'userId': o.userId,
      'coffeeType': Serialization.requiredEnum(CoffeeTypeUtil.serialize, o.coffeeType),
      'extras': Serialization.repeatedEnum(ExtraUtil.serialize, o.extras),
      'cupSize': Serialization.requiredEnum(CupSizeUtil.serialize, o.cupSize),  
    }
  }
}

export class GetOrdersRequest {
  readonly activeOnly: boolean | undefined;
  readonly limit: number | undefined;
  readonly continuation: string | undefined;
  constructor({
    activeOnly,
    limit,
    continuation,  
  }: {
    activeOnly?: boolean,
    limit?: number,
    continuation?: string,  
  }) {
    this.activeOnly = activeOnly;
    this.limit = limit;
    this.continuation = continuation;
  }
  
  static deserialize(o: any): GetOrdersRequest {
    return new GetOrdersRequest({
      activeOnly: Deserialization.optionalBoolean(o, 'activeOnly'),
      limit: Deserialization.optionalNumber(o, 'limit'),
      continuation: Deserialization.optionalString(o, 'continuation'),  
    })
  }
  
  static serialize(o: GetOrdersRequest): object {
    return {
      'activeOnly': o.activeOnly,
      'limit': o.limit,
      'continuation': o.continuation,  
    }
  }
}

export class GetOrdersResponse {
  readonly orders: Order[];
  readonly continuation: string | undefined;
  constructor({
    orders,
    continuation,  
  }: {
    orders: Order[],
    continuation?: string,  
  }) {
    this.orders = orders;
    this.continuation = continuation;
  }
  
  static deserialize(o: any): GetOrdersResponse {
    return new GetOrdersResponse({
      orders: Deserialization.repeatedObject(Order.deserialize, o, 'orders'),
      continuation: Deserialization.optionalString(o, 'continuation'),  
    })
  }
  
  static serialize(o: GetOrdersResponse): object {
    return {
      'orders': Serialization.repeatedObject(Order.serialize, o.orders),
      'continuation': o.continuation,  
    }
  }
}

export class GetOrderResponse {
  readonly order: Order;
  constructor({
    order,  
  }: {
    order: Order,  
  }) {
    this.order = order;
  }
  
  static deserialize(o: any): GetOrderResponse {
    return new GetOrderResponse({
      order: Deserialization.requiredObject(Order.deserialize, o, 'order'),  
    })
  }
  
  static serialize(o: GetOrderResponse): object {
    return {
      'order': Serialization.requiredObject(Order.serialize, o.order),  
    }
  }
}

export class CreateOrderRequest {
  readonly coffeeType: CoffeeType;
  readonly milkType: MilkType;
  readonly extras: Extra[];
  readonly cupSize: CupSize;
  constructor({
    coffeeType,
    milkType,
    extras,
    cupSize,  
  }: {
    coffeeType: CoffeeType,
    milkType: MilkType,
    extras: Extra[],
    cupSize: CupSize,  
  }) {
    this.coffeeType = coffeeType;
    this.milkType = milkType;
    this.extras = extras;
    this.cupSize = cupSize;
  }
  
  static deserialize(o: any): CreateOrderRequest {
    return new CreateOrderRequest({
      coffeeType: Deserialization.requiredEnum(CoffeeTypeUtil.deserialize, o, 'coffeeType'),
      milkType: Deserialization.requiredEnum(MilkTypeUtil.deserialize, o, 'milkType'),
      extras: Deserialization.repeatedEnum(ExtraUtil.deserialize, o, 'extras'),
      cupSize: Deserialization.requiredEnum(CupSizeUtil.deserialize, o, 'cupSize'),  
    })
  }
  
  static serialize(o: CreateOrderRequest): object {
    return {
      'coffeeType': Serialization.requiredEnum(CoffeeTypeUtil.serialize, o.coffeeType),
      'milkType': Serialization.requiredEnum(MilkTypeUtil.serialize, o.milkType),
      'extras': Serialization.repeatedEnum(ExtraUtil.serialize, o.extras),
      'cupSize': Serialization.requiredEnum(CupSizeUtil.serialize, o.cupSize),  
    }
  }
}

export class CreateOrderResponse {
  readonly order: Order;
  constructor({
    order,  
  }: {
    order: Order,  
  }) {
    this.order = order;
  }
  
  static deserialize(o: any): CreateOrderResponse {
    return new CreateOrderResponse({
      order: Deserialization.requiredObject(Order.deserialize, o, 'order'),  
    })
  }
  
  static serialize(o: CreateOrderResponse): object {
    return {
      'order': Serialization.requiredObject(Order.serialize, o.order),  
    }
  }
}

export class UpdateOrderRequest {
  readonly status: OrderStatus;
  readonly orderId: string;
  constructor({
    status,
    orderId,  
  }: {
    status: OrderStatus,
    orderId: string,  
  }) {
    this.status = status;
    this.orderId = orderId;
  }
  
  static deserialize(o: any): UpdateOrderRequest {
    return new UpdateOrderRequest({
      status: Deserialization.requiredEnum(OrderStatusUtil.deserialize, o, 'status'),
      orderId: Deserialization.requiredString(o, 'orderId'),  
    })
  }
  
  static serialize(o: UpdateOrderRequest): object {
    return {
      'status': Serialization.requiredEnum(OrderStatusUtil.serialize, o.status),
      'orderId': o.orderId,  
    }
  }
}

export class UpdateOrderResponse {
  readonly order: Order;
  constructor({
    order,  
  }: {
    order: Order,  
  }) {
    this.order = order;
  }
  
  static deserialize(o: any): UpdateOrderResponse {
    return new UpdateOrderResponse({
      order: Deserialization.requiredObject(Order.deserialize, o, 'order'),  
    })
  }
  
  static serialize(o: UpdateOrderResponse): object {
    return {
      'order': Serialization.requiredObject(Order.serialize, o.order),  
    }
  }
}
