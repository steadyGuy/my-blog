import { Request } from 'express';
import { IUser } from '../models/User';

export interface IAccessTokenDecoded {
  id: string;
  iat: number;
  exp: number;
}

export interface IReqAuth extends Request {
  user?: IUser;
}