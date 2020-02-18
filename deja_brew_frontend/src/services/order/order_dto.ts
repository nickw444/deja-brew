// @formatter:off
import { UnreachableError } from 'base/preconditions';
import { Deserialization } from 'base/deserialization';
import { Serialization } from 'base/serialization';

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

export class OrderUserInfo {
  readonly avatarUrl: string | undefined;
  readonly id: string;
  readonly name: string | undefined;
  constructor({
    avatarUrl,
    id,
    name,  
  }: {
    avatarUrl?: string,
    id: string,
    name?: string,  
  }) {
    this.avatarUrl = avatarUrl;
    this.id = id;
    this.name = name;
  }
  
  static deserialize(o: any): OrderUserInfo {
    return new OrderUserInfo({
      avatarUrl: Deserialization.optionalString(o, 'avatarUrl'),
      id: Deserialization.requiredString(o, 'id'),
      name: Deserialization.optionalString(o, 'name'),  
    })
  }
  
  static serialize(o: OrderUserInfo): object {
    return {
      'avatarUrl': o.avatarUrl,
      'id': o.id,
      'name': o.name,  
    }
  }
}

export class Order {
  readonly coffeeType: CoffeeType;
  readonly createdAt: number;
  readonly cupSize: CupSize;
  readonly extras: Extra[];
  readonly id: string;
  readonly milkType: MilkType;
  readonly status: OrderStatus;
  readonly user: OrderUserInfo;
  constructor({
    coffeeType,
    createdAt,
    cupSize,
    extras,
    id,
    milkType,
    status,
    user,  
  }: {
    coffeeType: CoffeeType,
    createdAt: number,
    cupSize: CupSize,
    extras: Extra[],
    id: string,
    milkType: MilkType,
    status: OrderStatus,
    user: OrderUserInfo,  
  }) {
    this.coffeeType = coffeeType;
    this.createdAt = createdAt;
    this.cupSize = cupSize;
    this.extras = extras;
    this.id = id;
    this.milkType = milkType;
    this.status = status;
    this.user = user;
  }
  
  static deserialize(o: any): Order {
    return new Order({
      coffeeType: Deserialization.requiredEnum(CoffeeTypeUtil.deserialize, o, 'coffeeType'),
      createdAt: Deserialization.requiredNumber(o, 'createdAt'),
      cupSize: Deserialization.requiredEnum(CupSizeUtil.deserialize, o, 'cupSize'),
      extras: Deserialization.repeatedEnum(ExtraUtil.deserialize, o, 'extras'),
      id: Deserialization.requiredString(o, 'id'),
      milkType: Deserialization.requiredEnum(MilkTypeUtil.deserialize, o, 'milkType'),
      status: Deserialization.requiredEnum(OrderStatusUtil.deserialize, o, 'status'),
      user: Deserialization.requiredObject(OrderUserInfo.deserialize, o, 'user'),  
    })
  }
  
  static serialize(o: Order): object {
    return {
      'coffeeType': Serialization.requiredEnum(CoffeeTypeUtil.serialize, o.coffeeType),
      'createdAt': o.createdAt,
      'cupSize': Serialization.requiredEnum(CupSizeUtil.serialize, o.cupSize),
      'extras': Serialization.repeatedEnum(ExtraUtil.serialize, o.extras),
      'id': o.id,
      'milkType': Serialization.requiredEnum(MilkTypeUtil.serialize, o.milkType),
      'status': Serialization.requiredEnum(OrderStatusUtil.serialize, o.status),
      'user': Serialization.requiredObject(OrderUserInfo.serialize, o.user),  
    }
  }
}

export class GetOrdersRequest {
  readonly createdAfter: number | undefined;
  readonly createdBy: string | undefined;
  readonly limit: number | undefined;
  readonly statuses: OrderStatus[];
  constructor({
    createdAfter,
    createdBy,
    limit,
    statuses,  
  }: {
    createdAfter?: number,
    createdBy?: string,
    limit?: number,
    statuses: OrderStatus[],  
  }) {
    this.createdAfter = createdAfter;
    this.createdBy = createdBy;
    this.limit = limit;
    this.statuses = statuses;
  }
  
  static deserialize(o: any): GetOrdersRequest {
    return new GetOrdersRequest({
      createdAfter: Deserialization.optionalNumber(o, 'createdAfter'),
      createdBy: Deserialization.optionalString(o, 'createdBy'),
      limit: Deserialization.optionalNumber(o, 'limit'),
      statuses: Deserialization.repeatedEnum(OrderStatusUtil.deserialize, o, 'statuses'),  
    })
  }
  
  static serialize(o: GetOrdersRequest): object {
    return {
      'createdAfter': o.createdAfter,
      'createdBy': o.createdBy,
      'limit': o.limit,
      'statuses': Serialization.repeatedEnum(OrderStatusUtil.serialize, o.statuses),  
    }
  }
}

export class GetOrdersResponse {
  readonly continuation: string | undefined;
  readonly orders: Order[];
  constructor({
    continuation,
    orders,  
  }: {
    continuation?: string,
    orders: Order[],  
  }) {
    this.continuation = continuation;
    this.orders = orders;
  }
  
  static deserialize(o: any): GetOrdersResponse {
    return new GetOrdersResponse({
      continuation: Deserialization.optionalString(o, 'continuation'),
      orders: Deserialization.repeatedObject(Order.deserialize, o, 'orders'),  
    })
  }
  
  static serialize(o: GetOrdersResponse): object {
    return {
      'continuation': o.continuation,
      'orders': Serialization.repeatedObject(Order.serialize, o.orders),  
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
  readonly cupSize: CupSize;
  readonly extras: Extra[];
  readonly milkType: MilkType;
  constructor({
    coffeeType,
    cupSize,
    extras,
    milkType,  
  }: {
    coffeeType: CoffeeType,
    cupSize: CupSize,
    extras: Extra[],
    milkType: MilkType,  
  }) {
    this.coffeeType = coffeeType;
    this.cupSize = cupSize;
    this.extras = extras;
    this.milkType = milkType;
  }
  
  static deserialize(o: any): CreateOrderRequest {
    return new CreateOrderRequest({
      coffeeType: Deserialization.requiredEnum(CoffeeTypeUtil.deserialize, o, 'coffeeType'),
      cupSize: Deserialization.requiredEnum(CupSizeUtil.deserialize, o, 'cupSize'),
      extras: Deserialization.repeatedEnum(ExtraUtil.deserialize, o, 'extras'),
      milkType: Deserialization.requiredEnum(MilkTypeUtil.deserialize, o, 'milkType'),  
    })
  }
  
  static serialize(o: CreateOrderRequest): object {
    return {
      'coffeeType': Serialization.requiredEnum(CoffeeTypeUtil.serialize, o.coffeeType),
      'cupSize': Serialization.requiredEnum(CupSizeUtil.serialize, o.cupSize),
      'extras': Serialization.repeatedEnum(ExtraUtil.serialize, o.extras),
      'milkType': Serialization.requiredEnum(MilkTypeUtil.serialize, o.milkType),  
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
  readonly orderId: string;
  readonly status: OrderStatus;
  constructor({
    orderId,
    status,  
  }: {
    orderId: string,
    status: OrderStatus,  
  }) {
    this.orderId = orderId;
    this.status = status;
  }
  
  static deserialize(o: any): UpdateOrderRequest {
    return new UpdateOrderRequest({
      orderId: Deserialization.requiredString(o, 'orderId'),
      status: Deserialization.requiredEnum(OrderStatusUtil.deserialize, o, 'status'),  
    })
  }
  
  static serialize(o: UpdateOrderRequest): object {
    return {
      'orderId': o.orderId,
      'status': Serialization.requiredEnum(OrderStatusUtil.serialize, o.status),  
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
