import { delay } from 'base/delay';
import {
  Cafe,
  GetCafeResponse,
  UpdateCafeRequest,
  UpdateCafeResponse,
} from 'services/cafe/cafe_dto';
import { CafeService } from 'services/cafe/cafe_service';
import { aCafeWith } from './builders';


export class FakeCafeService implements CafeService {
  private cafe: Cafe = aCafeWith({});

  constructor(private readonly delay: number) {
  }

  async getCafe(): Promise<GetCafeResponse> {
    await delay(this.delay);
    return new GetCafeResponse({ cafe: this.cafe });
  }

  async updateCafe(req: UpdateCafeRequest): Promise<UpdateCafeResponse> {
    await delay(this.delay);

    this.cafe = new Cafe({
      ...this.cafe,
      acceptingOrders: req.acceptingOrders,
    });

    return new UpdateCafeResponse({
      cafe: this.cafe,
    });
  }

}
