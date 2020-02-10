// @formatter:off
import {Order, User} from 'services/order/order_service_objects';

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
  readonly lastOrder: Order | undefined;
  constructor({
    user,
    lastOrder,  
  }: {
    user: User,
    lastOrder?: Order,  
  }) {
    this.user = user;
    this.lastOrder = lastOrder;
  }
  
  static deserialize(o: any): GetUserInfoResponse {
    return new GetUserInfoResponse({
      user: o['user'],
      lastOrder: o['lastOrder'],  
    })
  }
  
  static serialize(o: GetUserInfoResponse): object {
    return {
      'user': o.user,
      'lastOrder': o.lastOrder,  
    }
  }
}
