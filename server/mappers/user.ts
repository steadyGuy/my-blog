import { IUser } from '../models/User';

export default function userMapper(user: IUser) {
  return {
    id: user.id,
    account: user.account,
    name: user.name,
    avatar: user.avatar,
    role: user.role,
    isActive: user.isActive,
  };
};
