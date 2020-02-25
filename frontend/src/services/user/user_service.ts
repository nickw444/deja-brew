import { GetUserInfoRequest, GetUserInfoResponse } from './user_dto';

export interface UserService {
  getUserInfo(req: GetUserInfoRequest): Promise<GetUserInfoResponse>;
}
