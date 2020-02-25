import { delay } from 'base/delay';
import { aUserInfoWith } from 'services/user/fake/builders';
import { GetUserInfoRequest, GetUserInfoResponse } from 'services/user/user_dto';
import { UserService } from 'services/user/user_service';

export class FakeUserService implements UserService {
  constructor(private readonly delay: number) {
  }

  async getUserInfo(req: GetUserInfoRequest): Promise<GetUserInfoResponse> {
    await delay(this.delay);
    return new GetUserInfoResponse({
      user: aUserInfoWith(),
    });
  }
}
