// @formatter:off
import { Serialization } from 'base/serialization';
import { UserInfo } from 'services/user/user_dto';
import { Deserialization } from 'base/deserialization';

export class Bootstrap {
  readonly user: UserInfo | undefined;
  constructor({
    user,  
  }: {
    user?: UserInfo,  
  }) {
    this.user = user;
  }
  
  static deserialize(o: any): Bootstrap {
    return new Bootstrap({
      user: Deserialization.optionalObject(UserInfo.deserialize, o, 'user'),  
    })
  }
  
  static serialize(o: Bootstrap): object {
    return {
      'user': Serialization.optionalObject(UserInfo.serialize, o.user),  
    }
  }
}
