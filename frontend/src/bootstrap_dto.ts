// @formatter:off
import { Deserialization } from 'base/deserialization';
import { Serialization } from 'base/serialization';
import { UnreachableError } from 'base/preconditions';
import { UserInfo } from 'services/user/user_dto';

export enum Mode {
  FAKE,
  REAL,
}

export const ModeUtil = {
  deserialize(value: string): Mode {
    switch(value) {
      case 'FAKE': return Mode.FAKE;
      case 'REAL': return Mode.REAL;
      default: throw new Error('Unknown value: ' + value)
    }
  },
  serialize(value: Mode): string {
    switch(value) {
      case Mode.FAKE: return 'FAKE';
      case Mode.REAL: return 'REAL';
      default: throw new UnreachableError(value)
    } 
  },
  values(): Mode[] {
    return [
      Mode.FAKE,
      Mode.REAL,
    ]
  }
};

export class Bootstrap {
  readonly mode: Mode;
  readonly user: UserInfo | undefined;
  constructor({
    mode,
    user,  
  }: {
    mode: Mode,
    user?: UserInfo,  
  }) {
    this.mode = mode;
    this.user = user;
  }
  
  static deserialize(o: any): Bootstrap {
    return new Bootstrap({
      mode: Deserialization.requiredEnum(ModeUtil.deserialize, o, 'mode'),
      user: Deserialization.optionalObject(UserInfo.deserialize, o, 'user'),  
    })
  }
  
  static serialize(o: Bootstrap): object {
    return {
      'mode': Serialization.requiredEnum(ModeUtil.serialize, o.mode),
      'user': Serialization.optionalObject(UserInfo.serialize, o.user),  
    }
  }
}
