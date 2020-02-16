import { HttpService } from 'services/http/http_service';
import { UserService } from 'services/user/user_service';
import { GetUserInfoRequest, GetUserInfoResponse } from './user_dto';

export class HttpUserService implements UserService {
  constructor(
      private readonly httpService: HttpService,
  ) {
  }

  async getUserInfo(req: GetUserInfoRequest): Promise<GetUserInfoResponse> {
    const data = await this.httpService.get('/users/' + req.id);
    return GetUserInfoResponse.deserialize(data);
  }
}
