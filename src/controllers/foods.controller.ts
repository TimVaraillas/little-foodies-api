import { RequestHandler } from 'express';
import { Food } from '~/models/food.model';

export const getFoods: RequestHandler = async (req, res) => {
  try{
    const data = await Food.find().populate("category");
    res.json(data)
  }
  catch(error: any){
    res.status(500).json({ message: error.message })
  }
}

export const getFoodById: RequestHandler = async (req, res) => {
  try{
    const data = await Food.findById(req.params.id).populate("category");
    res.json(data)
  }
  catch(error: any){
    res.status(500).json({ message: error.message })
  }
}
