import { Response, Request } from 'express';
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
  async getHomeArticles(req: Request, res: Response) {
    try {
      const articles = await Article.aggregate([
        {
          $lookup: {
            from: 'users',
            let: { user_id: "$user" },
            pipeline: [
              { $match: { $expr: { $eq: ["$_id", "$$user_id"] } } },
              { $project: { passwordHash: 0 } },
            ],
            as: 'user',
          },
        },
        {
          $unwind: "$user",
        },
        {
          $lookup: {
            from: 'categories',
            localField: 'category',
            foreignField: '_id',
            as: 'category',
          }
        },
        {
          $unwind: "$category",
        },
        {
          $sort: {
            "createdAt": -1,
          }
        },
        {
          $group: {
            _id: "$category._id",
            name: { $first: "$category.name" },
            articles: { $push: "$$ROOT" },
            count: { $sum: 1 },
          }
        },
        // Pagination
        {
          $project: {
            articles: {
              $slice: ['$articles', 0, 4],
            },
            count: 1,
            name: 1,
          }
        }
      ]);

      return res.status(200).json({ articles });

    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },
}

export default ArticleController;