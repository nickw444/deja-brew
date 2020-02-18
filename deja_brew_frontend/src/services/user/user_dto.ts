// @formatter:off
import { UnreachableError } from 'base/preconditions';
import { Deserialization } from 'base/deserialization';
import { Serialization } from 'base/serialization';

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
  readonly id: string;
  readonly name: string | undefined;
  readonly roles: Role[];
  constructor({
    avatarUrl,
    id,
    name,
    roles,  
  }: {
    avatarUrl?: string,
    id: string,
    name?: string,
    roles: Role[],  
  }) {
    this.avatarUrl = avatarUrl;
    this.id = id;
    this.name = name;
    this.roles = roles;
  }
  
  static deserialize(o: any): UserInfo {
    return new UserInfo({
      avatarUrl: Deserialization.optionalString(o, 'avatarUrl'),
      id: Deserialization.requiredString(o, 'id'),
      name: Deserialization.optionalString(o, 'name'),
      roles: Deserialization.repeatedEnum(RoleUtil.deserialize, o, 'roles'),  
    })
  }
  
  static serialize(o: UserInfo): object {
    return {
      'avatarUrl': o.avatarUrl,
      'id': o.id,
      'name': o.name,
      'roles': Serialization.repeatedEnum(RoleUtil.serialize, o.roles),  
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
