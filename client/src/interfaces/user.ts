export interface IUserSignIn {
  account: string;
  password: string;
}

export interface IUserSignUp extends IUserSignIn {
  name: string;
  passwordConfirm: string;
}

export interface IUser {
  account: string;
  avatar: string;
  id: string;
  isActive: boolean;
  name: string;
  role: string;
  loginType: string;
}

export interface IParams {
  slug: string;
  page: string;
}