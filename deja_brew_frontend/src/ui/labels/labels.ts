import { UnreachableError } from 'base/preconditions';
import { CoffeeKind, Extra, Milk, Order, Size } from 'services/order/order_service_objects';

export function labelForMilk(milk: Milk): string {
  switch (milk) {
    case Milk.REGULAR:
      return 'Regular';
    case Milk.SKIM:
      return 'Skim';
    case Milk.SOY:
      return 'Soy';
    case Milk.ALMOND:
      return 'Almond';
    case Milk.OAT:
      return 'Oat';
    default:
      throw new UnreachableError(milk);
  }
}

export function labelForCoffeeKind(coffeeKind: CoffeeKind): string {
  switch (coffeeKind) {
    case CoffeeKind.LATTE:
      return 'Latte';
    case CoffeeKind.CAPPUCCINO:
      return 'Cappuccino';
    case CoffeeKind.FLAT_WHITE:
      return 'Flat White';
    case CoffeeKind.LONG_BLACK:
      return 'Long Black';
    case CoffeeKind.MOCHA:
      return 'Mocha';
    case CoffeeKind.HOT_CHOC:
      return 'Hot Choc';
    case CoffeeKind.MATCHA:
      return 'Matcha';
    case CoffeeKind.ESPRESSO:
      return 'Espresso';
    default:
      throw new UnreachableError(coffeeKind);
  }
}


export function labelForExtra(extra: Extra): string {
  switch (extra) {
    case Extra.DECAF:
      return 'Decaf';
    case Extra.EXTRA_SHOT:
      return 'Extra Shot';
    case Extra.HONEY:
      return 'Honey';
    case Extra.ICED:
      return 'Iced';
    case Extra.SUGAR:
      return 'Sugar';
    default:
      throw new UnreachableError(extra);
  }
}

export function labelForSize(size: Size): string {
  switch (size) {
    case Size.SMALL:
      return 'Small';
    case Size.MEDIUM:
      return 'Medium';
    case Size.LARGE:
      return 'Large';
    default:
      throw new UnreachableError(size);
  }
}

export function getOrderTypeLabel({
  milk,
  kind,
  size,
  extras,
}: {
  kind: CoffeeKind
  milk: Milk,
  size: Size,
  extras: readonly Extra[]
}) {
  const milkType = milk === Milk.REGULAR ? '' : labelForMilk(milk);
  const decaf = extras.includes(Extra.DECAF) ? labelForExtra(Extra.DECAF) : '';
  const iced = extras.includes(Extra.ICED) ? labelForExtra(Extra.ICED) : '';
  return titleCase([
    labelForSize(size),
    decaf,
    iced,
    milkType,
    labelForCoffeeKind(kind),
  ].join(' '));
}

export function getOrderExtrasLabel(extras: readonly Extra[]): string|undefined {
  const realExtras = extras
      .filter(extra => ![Extra.DECAF, Extra.ICED].includes(extra));
  if (realExtras.length) {
    const extrasCounts = new Map<Extra, number>();
    realExtras.forEach(extra => {
      const currCount = extrasCounts.get(extra) || 0;
      extrasCounts.set(extra, currCount + 1);
    });

    return Array.from(extrasCounts).map(([extra, count]) => {
      return `${count}x ${titleCase(labelForExtra(extra))}`;
    }).join(', ');
  }
}


export function cardTitleOfOrder(order: Order) {
  return getOrderTypeLabel({ ...order });
}

export function extrasLabelOfOrder(order: Order): string | undefined {
  return getOrderExtrasLabel(order.extras);
}

function titleCase(str: string) {
  return str.toLowerCase().split(' ').map(function(word) {
    return (word.charAt(0).toUpperCase() + word.slice(1));
  }).join(' ');
}
