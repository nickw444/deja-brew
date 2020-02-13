// @formatter:off
import { UnreachableError } from 'base/preconditions';
import { UserInfo } from 'services/user/user_dto';

export enum CupSize {
  SMALL = 'SMALL',
  MEDIUM = 'MEDIUM',
  LARGE = 'LARGE',
}

export const CupSizeUtil = {
  deserialize(value: string): CupSize {
    switch(value) {
      case '1': return CupSize.SMALL;
      case '2': return CupSize.MEDIUM;
      case '3': return CupSize.LARGE;
      default: throw new Error('Unknown value: ' + value)
    }
  },
  serialize(value: CupSize): string {
    switch(value) {
      case CupSize.SMALL: return '1';
      case CupSize.MEDIUM: return '2';
      case CupSize.LARGE: return '3';
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
      case '1': return CoffeeType.LATTE;
      case '2': return CoffeeType.CAPPUCCINO;
      case '3': return CoffeeType.FLAT_WHITE;
      case '4': return CoffeeType.LONG_BLACK;
      case '5': return CoffeeType.MOCHA;
      case '6': return CoffeeType.HOT_CHOC;
      case '7': return CoffeeType.MATCHA;
      case '8': return CoffeeType.ESPRESSO;
      default: throw new Error('Unknown value: ' + value)
    }
  },
  serialize(value: CoffeeType): string {
    switch(value) {
      case CoffeeType.LATTE: return '1';
      case CoffeeType.CAPPUCCINO: return '2';
      case CoffeeType.FLAT_WHITE: return '3';
      case CoffeeType.LONG_BLACK: return '4';
      case CoffeeType.MOCHA: return '5';
      case CoffeeType.HOT_CHOC: return '6';
      case CoffeeType.MATCHA: return '7';
      case CoffeeType.ESPRESSO: return '8';
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
      case '1': return MilkType.REGULAR;
      case '2': return MilkType.SKIM;
      case '3': return MilkType.SOY;
      case '4': return MilkType.ALMOND;
      case '5': return MilkType.OAT;
      default: throw new Error('Unknown value: ' + value)
    }
  },
  serialize(value: MilkType): string {
    switch(value) {
      case MilkType.REGULAR: return '1';
      case MilkType.SKIM: return '2';
      case MilkType.SOY: return '3';
      case MilkType.ALMOND: return '4';
      case MilkType.OAT: return '5';
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
      case '1': return Extra.DECAF;
      case '2': return Extra.EXTRA_SHOT;
      case '3': return Extra.HONEY;
      case '4': return Extra.ICED;
      case '5': return Extra.SUGAR;
      default: throw new Error('Unknown value: ' + value)
    }
  },
  serialize(value: Extra): string {
    switch(value) {
      case Extra.DECAF: return '1';
      case Extra.EXTRA_SHOT: return '2';
      case Extra.HONEY: return '3';
      case Extra.ICED: return '4';
      case Extra.SUGAR: return '5';
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
      case '1': return OrderStatus.SUBMITTED;
      case '2': return OrderStatus.PREPARING;
      case '3': return OrderStatus.COMPLETED;
      case '4': return OrderStatus.CANCELLED;
      default: throw new Error('Unknown value: ' + value)
    }
  },
  serialize(value: OrderStatus): string {
    switch(value) {
      case OrderStatus.SUBMITTED: return '1';
      case OrderStatus.PREPARING: return '2';
      case OrderStatus.COMPLETED: return '3';
      case OrderStatus.CANCELLED: return '4';
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
  readonly id: string | undefined;
  readonly cupSize: CupSize | undefined;
  readonly status: OrderStatus | undefined;
  readonly coffeeType: CoffeeType | undefined;
  readonly users: UserInfo[] | undefined;
  readonly extras: Extra[] | undefined;
  readonly user: UserInfo | undefined;
  readonly milkType: MilkType | undefined;
  constructor({
    id,
    cupSize,
    status,
    coffeeType,
    users,
    extras,
    user,
    milkType,  
  }: {
    id?: string,
    cupSize?: CupSize,
    status?: OrderStatus,
    coffeeType?: CoffeeType,
    users?: UserInfo[],
    extras?: Extra[],
    user?: UserInfo,
    milkType?: MilkType,  
  }) {
    this.id = id;
    this.cupSize = cupSize;
    this.status = status;
    this.coffeeType = coffeeType;
    this.users = users;
    this.extras = extras;
    this.user = user;
    this.milkType = milkType;
  }
  
  static deserialize(o: any): Order {
    return new Order({
      id: o['id'],
      cupSize: o['cupSize'],
      status: o['status'],
      coffeeType: o['coffeeType'],
      users: o['users'],
      extras: o['extras'],
      user: o['user'],
      milkType: o['milkType'],  
    })
  }
  
  static serialize(o: Order): object {
    return {
      'id': o.id,
      'cupSize': o.cupSize,
      'status': o.status,
      'coffeeType': o.coffeeType,
      'users': o.users,
      'extras': o.extras,
      'user': o.user,
      'milkType': o.milkType,  
    }
  }
}

export class GetOrdersRequest {
  readonly limit: number;
  readonly continuation: string;
  readonly activeOnly: boolean;
  constructor({
    limit,
    continuation,
    activeOnly,  
  }: {
    limit: number,
    continuation: string,
    activeOnly: boolean,  
  }) {
    this.limit = limit;
    this.continuation = continuation;
    this.activeOnly = activeOnly;
  }
  
  static deserialize(o: any): GetOrdersRequest {
    return new GetOrdersRequest({
      limit: o['limit'],
      continuation: o['continuation'],
      activeOnly: o['activeOnly'],  
    })
  }
  
  static serialize(o: GetOrdersRequest): object {
    return {
      'limit': o.limit,
      'continuation': o.continuation,
      'activeOnly': o.activeOnly,  
    }
  }
}

export class GetOrdersResponse {
  readonly continuation: string;
  readonly orders: Order[] | undefined;
  constructor({
    continuation,
    orders,  
  }: {
    continuation: string,
    orders?: Order[],  
  }) {
    this.continuation = continuation;
    this.orders = orders;
  }
  
  static deserialize(o: any): GetOrdersResponse {
    return new GetOrdersResponse({
      continuation: o['continuation'],
      orders: o['orders'],  
    })
  }
  
  static serialize(o: GetOrdersResponse): object {
    return {
      'continuation': o.continuation,
      'orders': o.orders,  
    }
  }
}

export class GetOrderResponse {
  readonly order: Order | undefined;
  constructor({
    order,  
  }: {
    order?: Order,  
  }) {
    this.order = order;
  }
  
  static deserialize(o: any): GetOrderResponse {
    return new GetOrderResponse({
      order: o['order'],  
    })
  }
  
  static serialize(o: GetOrderResponse): object {
    return {
      'order': o.order,  
    }
  }
}

export class CreateOrderRequest {
  readonly milk: MilkType | undefined;
  readonly size: CupSize | undefined;
  readonly extras: Extra[] | undefined;
  readonly kind: CoffeeType | undefined;
  constructor({
    milk,
    size,
    extras,
    kind,  
  }: {
    milk?: MilkType,
    size?: CupSize,
    extras?: Extra[],
    kind?: CoffeeType,  
  }) {
    this.milk = milk;
    this.size = size;
    this.extras = extras;
    this.kind = kind;
  }
  
  static deserialize(o: any): CreateOrderRequest {
    return new CreateOrderRequest({
      milk: o['milk'],
      size: o['size'],
      extras: o['extras'],
      kind: o['kind'],  
    })
  }
  
  static serialize(o: CreateOrderRequest): object {
    return {
      'milk': o.milk,
      'size': o.size,
      'extras': o.extras,
      'kind': o.kind,  
    }
  }
}

export class CreateOrderResponse {
  readonly order: Order | undefined;
  constructor({
    order,  
  }: {
    order?: Order,  
  }) {
    this.order = order;
  }
  
  static deserialize(o: any): CreateOrderResponse {
    return new CreateOrderResponse({
      order: o['order'],  
    })
  }
  
  static serialize(o: CreateOrderResponse): object {
    return {
      'order': o.order,  
    }
  }
}

export class UpdateOrderRequest {
  readonly completed: boolean | undefined;
  constructor({
    completed,  
  }: {
    completed?: boolean,  
  }) {
    this.completed = completed;
  }
  
  static deserialize(o: any): UpdateOrderRequest {
    return new UpdateOrderRequest({
      completed: o['completed'],  
    })
  }
  
  static serialize(o: UpdateOrderRequest): object {
    return {
      'completed': o.completed,  
    }
  }
}

export class UpdateOrderResponse {
  readonly order: Order | undefined;
  constructor({
    order,  
  }: {
    order?: Order,  
  }) {
    this.order = order;
  }
  
  static deserialize(o: any): UpdateOrderResponse {
    return new UpdateOrderResponse({
      order: o['order'],  
    })
  }
  
  static serialize(o: UpdateOrderResponse): object {
    return {
      'order': o.order,  
    }
  }
}
