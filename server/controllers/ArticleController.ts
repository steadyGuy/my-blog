import { Response, Request } from 'express';
import { IReqAuth } from '../interfaces';
import Article from '../models/Article';
import mongoose from 'mongoose';

const Pagination = (req: IReqAuth) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 2;
  const skip = (page - 1) * limit;

  return { page, limit, skip };
}

const ArticleController = {
  async createArticle(req: IReqAuth, res: Response) {
    try {
      if (!req.user) {
        return res.status(400).json({ message: "Пользователя не существует" });
      };

      const { title, description, thumbnail, content, category } = req.body;

      const newArticle = new Article({
        title: title,
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
          $group: {
            _id: "$category._id",
            name: { $first: "$category.name" },
            slug: { $first: "$category.slug" },
            articles: { $push: "$$ROOT" },
            count: { $sum: 1 },
          }
        },
        {
          $sort: {
            "name": -1,
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
            slug: 1,
          }
        },
      ]);

      return res.status(200).json({ articles });

    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },
  async getArticlesByCategory(req: Request, res: Response) {

    const { limit, skip } = Pagination(req);

    try {
      const articles = await Article.aggregate([
        {
          $facet: {
            totalData: [
              {
                $match: {
                  category: mongoose.Types.ObjectId(req.params.categoryId)
                },
              },
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
                $sort: { createdAt: -1 },
              },
              {
                $skip: skip
              },
              {
                $limit: limit,
              },
            ],
            totalCount: [
              {
                $match: {
                  category: mongoose.Types.ObjectId(req.params.categoryId)
                },
              },
              {
                $count: 'count',
              }
            ]
          },
        },
        {
          $project: {
            totalData: 1,
            count: { $arrayElemAt: ["$totalCount.count", 0] }
          }
        },
      ]);
      // count - всего количество статтей в категории
      let pagesCount = 0, count = articles[0].count;

      if (count % limit === 0) {
        pagesCount = count / limit;
      } else {
        pagesCount = Math.floor(count / limit) + 1;
      }

      return res.status(200).json({ articles: { pagesCount, data: articles[0].totalData } });

    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },
  async getArticleById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const article = await Article.findById(id);

      if (!article) {
        return res.status(400).json({ message: `Статьи с id ${id} не существует` });
      }

      return res.status(200).json({ article });

    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },
  async updateArticleById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      console.log('req.body', req.body)
      const article = await Article.findByIdAndUpdate(id, req.body);

      return res.status(200).json({ message: 'Статья успешно обновлена' });

    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },
}

export default ArticleController;