import { RequestHandler } from 'express';
import { Category } from '~/models/category.model';

export const getCategories: RequestHandler = async (req, res) => {
  try{
    const data = await Category.find();
    res.json(data)
  }
  catch(error: any){
    res.status(500).json({ message: error.message })
  }
}

export const getCategoryById: RequestHandler = async (req, res) => {
  try{
    const data = await Category.findById(req.params.id);
    res.json(data)
  }
  catch(error: any){
    res.status(500).json({ message: error.message })
  }
}
