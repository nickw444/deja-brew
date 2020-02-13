// @formatter:off
import { User } from 'services/order/order_service_objects';

export class GetUserInfoRequest {
  readonly id: string;
  constructor({
    id,  
  }: {
    id: string,  
  }) {
    this.id = id;
  }
  
  static deserialize(o: any): GetUserInfoRequest {
    return new GetUserInfoRequest({
      id: o['id'],  
    })
  }
  
  static serialize(o: GetUserInfoRequest): object {
    return {
      'id': o.id,  
    }
  }
}

export class GetUserInfoResponse {
  readonly user: User;
  constructor({
    user,  
  }: {
    user: User,  
  }) {
    this.user = user;
  }
  
  static deserialize(o: any): GetUserInfoResponse {
    return new GetUserInfoResponse({
      user: o['user'],  
    })
  }
  
  static serialize(o: GetUserInfoResponse): object {
    return {
      'user': o.user,  
    }
  }
}
