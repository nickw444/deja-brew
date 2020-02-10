// @formatter:off
import {
  UnreachableError
} from 'base/preconditions'

export enum Size {
  SMALL = 'SMALL',
  MEDIUM = 'MEDIUM',
  LARGE = 'LARGE',
}

export const SizeUtil = {
  deserialize(value: string): Size {
    switch(value) {
      case 'SMALL': return Size.SMALL;
      case 'MEDIUM': return Size.MEDIUM;
      case 'LARGE': return Size.LARGE;
      default: throw new Error('Unknown value: ' + value)
    }
  },
  serialize(value: Size): string {
    switch(value) {
      case Size.SMALL: return 'SMALL';
      case Size.MEDIUM: return 'MEDIUM';
      case Size.LARGE: return 'LARGE';
      default: throw new UnreachableError(value)
    } 
  },
  values(): Size[] {
    return [
      Size.SMALL,
      Size.MEDIUM,
      Size.LARGE,
    ]
  }
};

export enum Milk {
  REGULAR = 'REGULAR',
  SKIM = 'SKIM',
  SOY = 'SOY',
  ALMOND = 'ALMOND',
  OAT = 'OAT',
}

export const MilkUtil = {
  deserialize(value: string): Milk {
    switch(value) {
      case 'REGULAR': return Milk.REGULAR;
      case 'SKIM': return Milk.SKIM;
      case 'SOY': return Milk.SOY;
      case 'ALMOND': return Milk.ALMOND;
      case 'OAT': return Milk.OAT;
      default: throw new Error('Unknown value: ' + value)
    }
  },
  serialize(value: Milk): string {
    switch(value) {
      case Milk.REGULAR: return 'REGULAR';
      case Milk.SKIM: return 'SKIM';
      case Milk.SOY: return 'SOY';
      case Milk.ALMOND: return 'ALMOND';
      case Milk.OAT: return 'OAT';
      default: throw new UnreachableError(value)
    } 
  },
  values(): Milk[] {
    return [
      Milk.REGULAR,
      Milk.SKIM,
      Milk.SOY,
      Milk.ALMOND,
      Milk.OAT,
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

export enum CoffeeKind {
  LATTE = 'LATTE',
  CAPPUCCINO = 'CAPPUCCINO',
  FLAT_WHITE = 'FLAT_WHITE',
  LONG_BLACK = 'LONG_BLACK',
  MOCHA = 'MOCHA',
  HOT_CHOC = 'HOT_CHOC',
  MATCHA = 'MATCHA',
  ESPRESSO = 'ESPRESSO',
}

export const CoffeeKindUtil = {
  deserialize(value: string): CoffeeKind {
    switch(value) {
      case 'LATTE': return CoffeeKind.LATTE;
      case 'CAPPUCCINO': return CoffeeKind.CAPPUCCINO;
      case 'FLAT_WHITE': return CoffeeKind.FLAT_WHITE;
      case 'LONG_BLACK': return CoffeeKind.LONG_BLACK;
      case 'MOCHA': return CoffeeKind.MOCHA;
      case 'HOT_CHOC': return CoffeeKind.HOT_CHOC;
      case 'MATCHA': return CoffeeKind.MATCHA;
      case 'ESPRESSO': return CoffeeKind.ESPRESSO;
      default: throw new Error('Unknown value: ' + value)
    }
  },
  serialize(value: CoffeeKind): string {
    switch(value) {
      case CoffeeKind.LATTE: return 'LATTE';
      case CoffeeKind.CAPPUCCINO: return 'CAPPUCCINO';
      case CoffeeKind.FLAT_WHITE: return 'FLAT_WHITE';
      case CoffeeKind.LONG_BLACK: return 'LONG_BLACK';
      case CoffeeKind.MOCHA: return 'MOCHA';
      case CoffeeKind.HOT_CHOC: return 'HOT_CHOC';
      case CoffeeKind.MATCHA: return 'MATCHA';
      case CoffeeKind.ESPRESSO: return 'ESPRESSO';
      default: throw new UnreachableError(value)
    } 
  },
  values(): CoffeeKind[] {
    return [
      CoffeeKind.LATTE,
      CoffeeKind.CAPPUCCINO,
      CoffeeKind.FLAT_WHITE,
      CoffeeKind.LONG_BLACK,
      CoffeeKind.MOCHA,
      CoffeeKind.HOT_CHOC,
      CoffeeKind.MATCHA,
      CoffeeKind.ESPRESSO,
    ]
  }
};

export class User {
  readonly name: string | undefined;
  readonly id: string;
  constructor({
    name,
    id,  
  }: {
    name?: string,
    id: string,  
  }) {
    this.name = name;
    this.id = id;
  }
  
  static deserialize(o: any): User {
    return new User({
      name: o['name'],
      id: o['id'],  
    })
  }
  
  static serialize(o: User): object {
    return {
      'name': o.name,
      'id': o.id,  
    }
  }
}

export class Order {
  readonly milk: Milk;
  readonly id: string;
  readonly size: Size;
  readonly extras: Extra[];
  readonly user: User;
  readonly completed: boolean;
  readonly kind: CoffeeKind;
  constructor({
    milk,
    id,
    size,
    extras,
    user,
    completed,
    kind,  
  }: {
    milk: Milk,
    id: string,
    size: Size,
    extras: Extra[],
    user: User,
    completed: boolean,
    kind: CoffeeKind,  
  }) {
    this.milk = milk;
    this.id = id;
    this.size = size;
    this.extras = extras;
    this.user = user;
    this.completed = completed;
    this.kind = kind;
  }
  
  static deserialize(o: any): Order {
    return new Order({
      milk: o['milk'],
      id: o['id'],
      size: o['size'],
      extras: o['extras'],
      user: o['user'],
      completed: o['completed'],
      kind: o['kind'],  
    })
  }
  
  static serialize(o: Order): object {
    return {
      'milk': o.milk,
      'id': o.id,
      'size': o.size,
      'extras': o.extras,
      'user': o.user,
      'completed': o.completed,
      'kind': o.kind,  
    }
  }
}

export class GetOrdersRequest {
  readonly limit: number | undefined;
  readonly activeOnly: boolean | undefined;
  readonly continuation: string | undefined;
  constructor({
    limit,
    activeOnly,
    continuation,  
  }: {
    limit?: number,
    activeOnly?: boolean,
    continuation?: string,  
  }) {
    this.limit = limit;
    this.activeOnly = activeOnly;
    this.continuation = continuation;
  }
  
  static deserialize(o: any): GetOrdersRequest {
    return new GetOrdersRequest({
      limit: o['limit'],
      activeOnly: o['activeOnly'],
      continuation: o['continuation'],  
    })
  }
  
  static serialize(o: GetOrdersRequest): object {
    return {
      'limit': o.limit,
      'activeOnly': o.activeOnly,
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
  readonly extras: Extra[];
  readonly kind: CoffeeKind;
  readonly milk: Milk;
  readonly size: Size;
  constructor({
    extras,
    kind,
    milk,
    size,  
  }: {
    extras: Extra[],
    kind: CoffeeKind,
    milk: Milk,
    size: Size,  
  }) {
    this.extras = extras;
    this.kind = kind;
    this.milk = milk;
    this.size = size;
  }
  
  static deserialize(o: any): CreateOrderRequest {
    return new CreateOrderRequest({
      extras: o['extras'],
      kind: o['kind'],
      milk: o['milk'],
      size: o['size'],  
    })
  }
  
  static serialize(o: CreateOrderRequest): object {
    return {
      'extras': o.extras,
      'kind': o.kind,
      'milk': o.milk,
      'size': o.size,  
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
      order: o['order'],  
    })
  }
  
  static serialize(o: UpdateOrderResponse): object {
    return {
      'order': o.order,  
    }
  }
}
