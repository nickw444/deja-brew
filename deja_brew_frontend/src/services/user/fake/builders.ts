import { idGenerator } from 'base/id_generator';
import { UserInfo } from 'services/user/user_dto';

const userIdGenerator = idGenerator('UAAAAA', 1);

export function aUserInfoWith(opts: Partial<UserInfo> = {}): UserInfo {
  return new UserInfo({
    id: userIdGenerator(),
    name: 'Nick Whyte',
    avatarUrl: 'https://placekitten.com/g/200/200',
    roles: [],
    ...opts,
  });
}
