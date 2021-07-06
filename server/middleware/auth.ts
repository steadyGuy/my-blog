import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { IAccessTokenDecoded, IReqAuth } from '../interfaces';
import User from '../models/User';

export const auth = async (req: IReqAuth, res: Response, next: NextFunction): Promise<any> => {
  try {

    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) {
      return res.status(400).json({ message: 'Invalid Authentication' });
    }

    const { id } = <IAccessTokenDecoded>jwt.verify(token, `${process.env.ACCESS_TOKEN_SECRET}`);
    if (!id) {
      return res.status(400).json({ message: 'Invalid Authentication' });
    }

    const user = await User.findOne({ _id: id });

    if (!user) {
      return res.status(400).json({ message: 'Пользователь не существует' });
    }

    req.user = user;

    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}