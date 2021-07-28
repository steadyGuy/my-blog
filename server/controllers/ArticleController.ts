import { Response } from 'express';
import { IReqAuth } from '../interfaces';
import Article from '../models/Article';

const ArticleController = {
  async createArticle(req: IReqAuth, res: Response) {
    try {
      if (!req.user) {
        return res.status(400).json({ message: "Пользователя не существует" });
      };

      const { title, description, thumbnail, content, category } = req.body;

      const newArticle = new Article({
        title: title.toLowerCase(),
        description,
        thumbnail,
        content,
        category,
        user: req.user.id
      });

      await newArticle.save();

      return res.status(200).json({ message: "Вы успешно создали новую статью" });

    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },
}

export default ArticleController;