import { Response } from 'express';
import { IReqAuth } from '../interfaces';
import User from '../models/User';

const UserController = {
  async updateUser(req: IReqAuth, res: Response) {
    try {
      const { stuffToUpdate } = req.params;
      if (!req.user) {
        return res.status(400).json({ message: 'Пользователя не существует' });
      }

      if (stuffToUpdate === 'avatar') {
        req.user.avatar = req.body.avatar || '';
      } else if (stuffToUpdate === 'data') {
        req.user.name = req.body.name || '';
      }

      const updatedUser = await User.findOneAndUpdate({ _id: req.user.id }, {
        avatar: req.user.avatar,
        name: req.user.name,
      });

      if (!updatedUser) {
        return res.status(400).json({ message: 'Данные пользователя не удалось обновить' });
      }

      return res.status(200).json({ message: "Успешно обновлено" });

    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },
}

export default UserController;