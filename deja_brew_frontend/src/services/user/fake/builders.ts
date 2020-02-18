import { idGenerator } from 'base/id_generator';
import { UserInfo } from 'services/user/user_dto';

const userIdGenerator = idGenerator('UAAAAA', 1);

export function aUserInfoWith() {
  return new UserInfo({
    id: userIdGenerator(),
    name: 'Nick Whyte',
    roles: [],
  });
}
