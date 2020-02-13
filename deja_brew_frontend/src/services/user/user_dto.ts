// @formatter:off

export class UserInfo {
  readonly id: string | undefined;
  readonly lastOrder: Order;
  readonly avatarUrl: string;
  readonly name: string;
  constructor({
    id,
    lastOrder,
    avatarUrl,
    name,  
  }: {
    id?: string,
    lastOrder: Order,
    avatarUrl: string,
    name: string,  
  }) {
    this.id = id;
    this.lastOrder = lastOrder;
    this.avatarUrl = avatarUrl;
    this.name = name;
  }
  
  static deserialize(o: any): UserInfo {
    return new UserInfo({
      id: o['id'],
      lastOrder: o['lastOrder'],
      avatarUrl: o['avatarUrl'],
      name: o['name'],  
    })
  }
  
  static serialize(o: UserInfo): object {
    return {
      'id': o.id,
      'lastOrder': o.lastOrder,
      'avatarUrl': o.avatarUrl,
      'name': o.name,  
    }
  }
}

export class GetUserInfoRequest {
  readonly id: string | undefined;
  constructor({
    id,  
  }: {
    id?: string,  
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
  readonly user: UserInfo | undefined;
  constructor({
    user,  
  }: {
    user?: UserInfo,  
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
