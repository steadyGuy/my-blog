import { Response } from 'express';
import bcrypt from 'bcrypt';
import { IReqAuth } from '../interfaces';
import User from '../models/User';

const UserController = {
  async updateUser(req: IReqAuth, res: Response) {
    try {
      if (!req.user) {
        return res.status(400).json({ message: "Пользователя не существует" });
      };

      if (req.user.loginType !== 'email') {
        return res.status(400).json({ message: "Невозможно изменить пароль" });
      };

      const { stuffToUpdate } = req.params;

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
  async resetPassword(req: IReqAuth, res: Response) {
    try {
      if (!req.user) {
        return res.status(400).json({ message: "Пользователя не существует" });
      };

      const { password, newPassword } = req.body;

      const user = await User.findOne({ _id: req.user.id });

      if (!user) {
        return res.status(400).json({ message: "Пользователя не существует" });
      }

      const passwordOk = await bcrypt.compare(password, user.passwordHash);
      if (!passwordOk) {
        return res.status(400).json({ message: 'Страрый пароль введено неверно' });
      }

      const passwordHash = await bcrypt.hash(newPassword, 12);

      const updatedUser = await User.updateOne({ _id: req.user.id }, {
        passwordHash
      });

      return res.status(200).json({ message: "Вы успешно сменили пароль" });

    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },
}

export default UserController;