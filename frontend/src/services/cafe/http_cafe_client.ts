import { UrlBuilder } from 'base/url_builder';
import { GetCafeResponse, UpdateCafeRequest, UpdateCafeResponse } from 'services/cafe/cafe_dto';
import { CafeService } from 'services/cafe/cafe_service';
import { HttpService } from 'services/http/http_service';

export class HttpCafeClient implements CafeService {
  constructor(
      private readonly httpService: HttpService,
  ) {
  }

  async getCafe(): Promise<GetCafeResponse> {
    const data = await this.httpService.get(
        UrlBuilder.forPath('/cafe').build(),
    );
    return GetCafeResponse.deserialize(data);
  }

  async updateCafe(req: UpdateCafeRequest): Promise<UpdateCafeResponse> {
    const data = await this.httpService.post(
        UrlBuilder.forPath('/cafe').build(),
        UpdateCafeRequest.serialize(req),
    );
    return UpdateCafeResponse.deserialize(data);
  }
}
