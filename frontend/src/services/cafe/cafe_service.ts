import { GetCafeResponse, UpdateCafeRequest, UpdateCafeResponse } from 'services/cafe/cafe_dto';

export interface CafeService {
  getCafe(): Promise<GetCafeResponse>;

  updateCafe(req: UpdateCafeRequest): Promise<UpdateCafeResponse>;
}
