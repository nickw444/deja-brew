// @formatter:off
import { Serialization } from 'base/serialization';
import { Order } from 'services/order/order_dto';
import { Deserialization } from 'base/deserialization';

export class UserInfo {
  readonly avatarUrl: string | undefined;
  readonly lastOrder: Order | undefined;
  readonly name: string | undefined;
  readonly id: string;
  constructor({
    avatarUrl,
    lastOrder,
    name,
    id,  
  }: {
    avatarUrl?: string,
    lastOrder?: Order,
    name?: string,
    id: string,  
  }) {
    this.avatarUrl = avatarUrl;
    this.lastOrder = lastOrder;
    this.name = name;
    this.id = id;
  }
  
  static deserialize(o: any): UserInfo {
    return new UserInfo({
      avatarUrl: Deserialization.optionalString(o, 'avatarUrl'),
      lastOrder: Deserialization.optionalObject(Order.deserialize, o, 'lastOrder'),
      name: Deserialization.optionalString(o, 'name'),
      id: Deserialization.requiredString(o, 'id'),  
    })
  }
  
  static serialize(o: UserInfo): object {
    return {
      'avatarUrl': o.avatarUrl,
      'lastOrder': Serialization.optionalObject(Order.serialize, o.lastOrder),
      'name': o.name,
      'id': o.id,  
    }
  }
}

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
      id: Deserialization.requiredString(o, 'id'),  
    })
  }
  
  static serialize(o: GetUserInfoRequest): object {
    return {
      'id': o.id,  
    }
  }
}

export class GetUserInfoResponse {
  readonly user: UserInfo;
  constructor({
    user,  
  }: {
    user: UserInfo,  
  }) {
    this.user = user;
  }
  
  static deserialize(o: any): GetUserInfoResponse {
    return new GetUserInfoResponse({
      user: Deserialization.requiredObject(UserInfo.deserialize, o, 'user'),  
    })
  }
  
  static serialize(o: GetUserInfoResponse): object {
    return {
      'user': Serialization.requiredObject(UserInfo.serialize, o.user),  
    }
  }
}
