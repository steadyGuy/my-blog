import { Request, Response } from 'express';
import { IReqAuth } from '../interfaces';
import categoryMapper from '../mappers/category';
import Category from '../models/Category';
import { convertTitleToSlug } from '../utils/convertTitleToSlug';

const CategoryController = {
  async createCategory(req: IReqAuth, res: Response): Promise<any> {
    try {
      const name = req.body.name.toLowerCase();
      const cat = await Category.findOne({ name });

      if (!req.user) {
        return res.status(400).json({ message: 'Пользователь не существует' });
      }

      if (req.user.role !== 'admin') {
        return res.status(400).json({ message: 'У вас не достаточно прав' });
      }

      if (cat) {
        return res.status(400).json({ message: 'Категория с подобным именем уже создана' });
      }

      const newCategory = new Category({ name, slug: convertTitleToSlug(name) });

      await newCategory.save();

      return res.json({ message: 'Успешно создано', category: categoryMapper(newCategory) });
    } catch (err: any) {
      let errMsg;

      let name = Object.keys(err.errors)[0];
      errMsg = err.errors[`${name}`].message;

      return res.status(500).json({ message: errMsg });
    }
  },
  async getCategories(req: Request, res: Response): Promise<any> {
    try {
      const categories = await Category.find().sort('-createdAt');
      res.json({ categories: categories.map(categoryMapper), });
    } catch (err: any) {
      return res.status(500).json({ message: err.message });
    }
  },
  async updateCategory(req: IReqAuth, res: Response): Promise<any> {
    try {
      if (!req.user) {
        return res.status(400).json({ message: 'Пользователь не существует' });
      }

      if (req.user.role !== 'admin') {
        return res.status(400).json({ message: 'У вас не достаточно прав' });
      }

      const cat = await Category.findOneAndUpdate({ _id: req.params.id }, { name: req.body.name });
      if (!cat) {
        return res.status(400).json({ message: 'Категорию не найдено' });
      }

      res.json({ category: categoryMapper(cat), message: 'Успешно обновлено' });
    } catch (err: any) {
      return res.status(500).json({ message: err.message });
    }
  },
  async deleteCategory(req: IReqAuth, res: Response): Promise<any> {
    try {
      if (!req.user) {
        return res.status(400).json({ message: 'Пользователь не существует' });
      }

      if (req.user.role !== 'admin') {
        return res.status(400).json({ message: 'У вас не достаточно прав' });
      }

      const cat = await Category.findByIdAndDelete(req.params.id);
      if (!cat) {
        return res.status(400).json({ message: 'Категорию не найдено' });
      }

      res.json({ message: 'Успешно удалено', category: categoryMapper(cat) });
    } catch (err: any) {
      return res.status(500).json({ message: err.message });
    }
  }
}


export default CategoryController;