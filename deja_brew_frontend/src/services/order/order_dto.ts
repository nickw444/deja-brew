// @formatter:off
import { UnreachableError } from 'base/preconditions';
import { Serialization } from 'base/serialization';
import { Deserialization } from 'base/deserialization';

export enum CupSize {
  SMALL = 'SMALL',
  MEDIUM = 'MEDIUM',
  LARGE = 'LARGE',
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
  LATTE = 'LATTE',
  CAPPUCCINO = 'CAPPUCCINO',
  FLAT_WHITE = 'FLAT_WHITE',
  LONG_BLACK = 'LONG_BLACK',
  MOCHA = 'MOCHA',
  HOT_CHOC = 'HOT_CHOC',
  MATCHA = 'MATCHA',
  ESPRESSO = 'ESPRESSO',
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
  REGULAR = 'REGULAR',
  SKIM = 'SKIM',
  SOY = 'SOY',
  ALMOND = 'ALMOND',
  OAT = 'OAT',
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
  DECAF = 'DECAF',
  EXTRA_SHOT = 'EXTRA_SHOT',
  HONEY = 'HONEY',
  ICED = 'ICED',
  SUGAR = 'SUGAR',
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
  SUBMITTED = 'SUBMITTED',
  PREPARING = 'PREPARING',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export const OrderStatusUtil = {
  deserialize(value: string): OrderStatus {
    switch(value) {
      case 'SUBMITTED': return OrderStatus.SUBMITTED;
      case 'PREPARING': return OrderStatus.PREPARING;
      case 'COMPLETED': return OrderStatus.COMPLETED;
      case 'CANCELLED': return OrderStatus.CANCELLED;
      default: throw new Error('Unknown value: ' + value)
    }
  },
  serialize(value: OrderStatus): string {
    switch(value) {
      case OrderStatus.SUBMITTED: return 'SUBMITTED';
      case OrderStatus.PREPARING: return 'PREPARING';
      case OrderStatus.COMPLETED: return 'COMPLETED';
      case OrderStatus.CANCELLED: return 'CANCELLED';
      default: throw new UnreachableError(value)
    } 
  },
  values(): OrderStatus[] {
    return [
      OrderStatus.SUBMITTED,
      OrderStatus.PREPARING,
      OrderStatus.COMPLETED,
      OrderStatus.CANCELLED,
    ]
  }
};

export class Order {
  readonly userId: string;
  readonly cupSize: CupSize;
  readonly id: string;
  readonly status: OrderStatus;
  readonly milkType: MilkType;
  readonly extras: Extra[];
  readonly coffeeType: CoffeeType;
  constructor({
    userId,
    cupSize,
    id,
    status,
    milkType,
    extras,
    coffeeType,  
  }: {
    userId: string,
    cupSize: CupSize,
    id: string,
    status: OrderStatus,
    milkType: MilkType,
    extras: Extra[],
    coffeeType: CoffeeType,  
  }) {
    this.userId = userId;
    this.cupSize = cupSize;
    this.id = id;
    this.status = status;
    this.milkType = milkType;
    this.extras = extras;
    this.coffeeType = coffeeType;
  }
  
  static deserialize(o: any): Order {
    return new Order({
      userId: Deserialization.requiredString(o, 'userId'),
      cupSize: Deserialization.requiredEnum(CupSizeUtil.deserialize, o, 'cupSize'),
      id: Deserialization.requiredString(o, 'id'),
      status: Deserialization.requiredEnum(OrderStatusUtil.deserialize, o, 'status'),
      milkType: Deserialization.requiredEnum(MilkTypeUtil.deserialize, o, 'milkType'),
      extras: Deserialization.repeatedEnum(ExtraUtil.deserialize, o, 'extras'),
      coffeeType: Deserialization.requiredEnum(CoffeeTypeUtil.deserialize, o, 'coffeeType'),  
    })
  }
  
  static serialize(o: Order): object {
    return {
      'userId': o.userId,
      'cupSize': Serialization.requiredEnum(CupSizeUtil.serialize, o.cupSize),
      'id': o.id,
      'status': Serialization.requiredEnum(OrderStatusUtil.serialize, o.status),
      'milkType': Serialization.requiredEnum(MilkTypeUtil.serialize, o.milkType),
      'extras': Serialization.repeatedEnum(ExtraUtil.serialize, o.extras),
      'coffeeType': Serialization.requiredEnum(CoffeeTypeUtil.serialize, o.coffeeType),  
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
  readonly cupSize: CupSize;
  readonly extras: Extra[];
  readonly coffeeType: CoffeeType;
  readonly milkType: MilkType;
  constructor({
    cupSize,
    extras,
    coffeeType,
    milkType,  
  }: {
    cupSize: CupSize,
    extras: Extra[],
    coffeeType: CoffeeType,
    milkType: MilkType,  
  }) {
    this.cupSize = cupSize;
    this.extras = extras;
    this.coffeeType = coffeeType;
    this.milkType = milkType;
  }
  
  static deserialize(o: any): CreateOrderRequest {
    return new CreateOrderRequest({
      cupSize: Deserialization.requiredEnum(CupSizeUtil.deserialize, o, 'cupSize'),
      extras: Deserialization.repeatedEnum(ExtraUtil.deserialize, o, 'extras'),
      coffeeType: Deserialization.requiredEnum(CoffeeTypeUtil.deserialize, o, 'coffeeType'),
      milkType: Deserialization.requiredEnum(MilkTypeUtil.deserialize, o, 'milkType'),  
    })
  }
  
  static serialize(o: CreateOrderRequest): object {
    return {
      'cupSize': Serialization.requiredEnum(CupSizeUtil.serialize, o.cupSize),
      'extras': Serialization.repeatedEnum(ExtraUtil.serialize, o.extras),
      'coffeeType': Serialization.requiredEnum(CoffeeTypeUtil.serialize, o.coffeeType),
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
  readonly completed: boolean;
  constructor({
    completed,  
  }: {
    completed: boolean,  
  }) {
    this.completed = completed;
  }
  
  static deserialize(o: any): UpdateOrderRequest {
    return new UpdateOrderRequest({
      completed: Deserialization.requiredBoolean(o, 'completed'),  
    })
  }
  
  static serialize(o: UpdateOrderRequest): object {
    return {
      'completed': o.completed,  
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
