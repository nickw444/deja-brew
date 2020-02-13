// @formatter:off
import {
  UnreachableError
} from 'base/preconditions'

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

export class User {
  readonly avatarUrl: string | undefined;
  readonly lastOrder: Order | undefined;
  readonly id: string;
  readonly name: string | undefined;
  constructor({
    avatarUrl,
    lastOrder,
    id,
    name,  
  }: {
    avatarUrl?: string,
    lastOrder?: Order,
    id: string,
    name?: string,  
  }) {
    this.avatarUrl = avatarUrl;
    this.lastOrder = lastOrder;
    this.id = id;
    this.name = name;
  }
  
  static deserialize(o: any): User {
    return new User({
      avatarUrl: o['avatarUrl'],
      lastOrder: o['lastOrder'],
      id: o['id'],
      name: o['name'],  
    })
  }
  
  static serialize(o: User): object {
    return {
      'avatarUrl': o.avatarUrl,
      'lastOrder': o.lastOrder,
      'id': o.id,
      'name': o.name,  
    }
  }
}

export class Order {
  readonly id: string;
  readonly completed: boolean;
  readonly size: Size;
  readonly user: User;
  readonly extras: Extra[];
  readonly kind: CoffeeKind;
  readonly milk: Milk;
  constructor({
    id,
    completed,
    size,
    user,
    extras,
    kind,
    milk,  
  }: {
    id: string,
    completed: boolean,
    size: Size,
    user: User,
    extras: Extra[],
    kind: CoffeeKind,
    milk: Milk,  
  }) {
    this.id = id;
    this.completed = completed;
    this.size = size;
    this.user = user;
    this.extras = extras;
    this.kind = kind;
    this.milk = milk;
  }
  
  static deserialize(o: any): Order {
    return new Order({
      id: o['id'],
      completed: o['completed'],
      size: o['size'],
      user: o['user'],
      extras: o['extras'],
      kind: o['kind'],
      milk: o['milk'],  
    })
  }
  
  static serialize(o: Order): object {
    return {
      'id': o.id,
      'completed': o.completed,
      'size': o.size,
      'user': o.user,
      'extras': o.extras,
      'kind': o.kind,
      'milk': o.milk,  
    }
  }
}

export class GetOrdersRequest {
  readonly limit: number | undefined;
  readonly continuation: string | undefined;
  readonly activeOnly: boolean | undefined;
  constructor({
    limit,
    continuation,
    activeOnly,  
  }: {
    limit?: number,
    continuation?: string,
    activeOnly?: boolean,  
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
  readonly kind: CoffeeKind;
  readonly size: Size;
  readonly milk: Milk;
  readonly extras: Extra[];
  constructor({
    kind,
    size,
    milk,
    extras,  
  }: {
    kind: CoffeeKind,
    size: Size,
    milk: Milk,
    extras: Extra[],  
  }) {
    this.kind = kind;
    this.size = size;
    this.milk = milk;
    this.extras = extras;
  }
  
  static deserialize(o: any): CreateOrderRequest {
    return new CreateOrderRequest({
      kind: o['kind'],
      size: o['size'],
      milk: o['milk'],
      extras: o['extras'],  
    })
  }
  
  static serialize(o: CreateOrderRequest): object {
    return {
      'kind': o.kind,
      'size': o.size,
      'milk': o.milk,
      'extras': o.extras,  
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
