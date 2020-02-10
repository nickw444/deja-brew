import { GetUserInfoRequest, GetUserInfoResponse } from 'services/user/user_service_objects';

export interface UserService {
  getUserInfo(req: GetUserInfoRequest): Promise<GetUserInfoResponse>;
}
