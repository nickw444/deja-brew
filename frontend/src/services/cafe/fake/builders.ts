import { idGenerator } from 'base/id_generator';
import { Cafe } from 'services/cafe/cafe_dto';

export const cafeIdGenerator = idGenerator('OAAAAA', 1);

export function aCafeWith(opts: Partial<Cafe> = {}): Cafe {
  return new Cafe({
    id: cafeIdGenerator(),
    acceptingOrders: true,
    ...opts,
  });
}
