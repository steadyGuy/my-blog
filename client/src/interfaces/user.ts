export interface IUserSignIn {
  account: string;
  password: string;
}

export interface IUser {
  account: string;
  avatar: string;
  id: string;
  isActive: boolean;
  name: string;
  role: string;
}