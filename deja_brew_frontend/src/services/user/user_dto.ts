// @formatter:off
import { Order } from 'services/order/order_dto';
import { UnreachableError } from 'base/preconditions';
import { Serialization } from 'base/serialization';
import { Deserialization } from 'base/deserialization';

export enum Role {
  ADMIN,
  CAFE_STAFF,
}

export const RoleUtil = {
  deserialize(value: string): Role {
    switch(value) {
      case 'ADMIN': return Role.ADMIN;
      case 'CAFE_STAFF': return Role.CAFE_STAFF;
      default: throw new Error('Unknown value: ' + value)
    }
  },
  serialize(value: Role): string {
    switch(value) {
      case Role.ADMIN: return 'ADMIN';
      case Role.CAFE_STAFF: return 'CAFE_STAFF';
      default: throw new UnreachableError(value)
    } 
  },
  values(): Role[] {
    return [
      Role.ADMIN,
      Role.CAFE_STAFF,
    ]
  }
};

export class UserInfo {
  readonly avatarUrl: string | undefined;
  readonly roles: Role[];
  readonly name: string | undefined;
  readonly id: string;
  readonly lastOrder: Order | undefined;
  constructor({
    avatarUrl,
    roles,
    name,
    id,
    lastOrder,  
  }: {
    avatarUrl?: string,
    roles: Role[],
    name?: string,
    id: string,
    lastOrder?: Order,  
  }) {
    this.avatarUrl = avatarUrl;
    this.roles = roles;
    this.name = name;
    this.id = id;
    this.lastOrder = lastOrder;
  }
  
  static deserialize(o: any): UserInfo {
    return new UserInfo({
      avatarUrl: Deserialization.optionalString(o, 'avatarUrl'),
      roles: Deserialization.repeatedEnum(RoleUtil.deserialize, o, 'roles'),
      name: Deserialization.optionalString(o, 'name'),
      id: Deserialization.requiredString(o, 'id'),
      lastOrder: Deserialization.optionalObject(Order.deserialize, o, 'lastOrder'),  
    })
  }
  
  static serialize(o: UserInfo): object {
    return {
      'avatarUrl': o.avatarUrl,
      'roles': Serialization.repeatedEnum(RoleUtil.serialize, o.roles),
      'name': o.name,
      'id': o.id,
      'lastOrder': Serialization.optionalObject(Order.serialize, o.lastOrder),  
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
