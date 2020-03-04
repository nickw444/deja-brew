import { UnreachableError } from 'base/preconditions';
import { CoffeeType, CupSize, Extra, MilkType, Order } from 'services/order/order_dto';

export function labelForMilk(milk: MilkType): string {
  switch (milk) {
    case MilkType.REGULAR:
      return 'Regular';
    case MilkType.SKIM:
      return 'Skim';
    case MilkType.SOY:
      return 'Soy';
    case MilkType.ALMOND:
      return 'Almond';
    case MilkType.OAT:
      return 'Oat';
    default:
      throw new UnreachableError(milk);
  }
}

export function labelForCoffeeType(coffeeType: CoffeeType): string {
  switch (coffeeType) {
    case CoffeeType.LATTE:
      return 'Latte';
    case CoffeeType.CAPPUCCINO:
      return 'Cappuccino';
    case CoffeeType.FLAT_WHITE:
      return 'Flat White';
    case CoffeeType.LONG_BLACK:
      return 'Long Black';
    case CoffeeType.MOCHA:
      return 'Mocha';
    case CoffeeType.HOT_CHOC:
      return 'Hot Choc';
    case CoffeeType.MATCHA:
      return 'Matcha';
    case CoffeeType.ESPRESSO:
      return 'Espresso';
    default:
      throw new UnreachableError(coffeeType);
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

export function labelForSize(size: CupSize): string {
  switch (size) {
    case CupSize.SMALL:
      return 'Small';
    case CupSize.MEDIUM:
      return 'Medium';
    case CupSize.LARGE:
      return 'Large';
    default:
      throw new UnreachableError(size);
  }
}

export function getOrderTypeLabel({
  milkType,
  coffeeType,
  cupSize,
  extras,
}: {
  coffeeType: CoffeeType
  milkType: MilkType,
  cupSize: CupSize,
  extras: readonly Extra[]
}) {
  const milkLabel = milkType === MilkType.REGULAR ? '' : labelForMilk(milkType);
  const decaf = extras.includes(Extra.DECAF) ? labelForExtra(Extra.DECAF) : '';
  const iced = extras.includes(Extra.ICED) ? labelForExtra(Extra.ICED) : '';
  return titleCase([
    labelForSize(cupSize),
    decaf,
    iced,
    milkLabel,
    labelForCoffeeType(coffeeType),
  ].join(' '));
}

export function getOrderExtrasLabel(extras: readonly Extra[]): string | undefined {
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
