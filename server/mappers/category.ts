import { ICategory } from '../models/Category';

export default function categoryMapper(cat: ICategory) {
  return {
    id: cat.id,
    name: cat.name,
    updatedAt: cat.updatedAt,
    createdAt: cat.createdAt,
  };
}