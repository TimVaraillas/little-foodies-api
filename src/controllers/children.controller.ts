import { RequestHandler } from 'express';
import { Child } from '~/models/child.model';

export const postChild: RequestHandler = async (req, res) => {
  const { first_name, last_name, gender, birthday, user_id } = req.body;
  try{
    const child = new Child({
      first_name,
      last_name,
      gender,
      birthday: new Date(birthday),
      user: user_id
    });
    
    const saved = await child.save();
    res.json(saved);
  }
  catch(err: any){
    console.error(err.message);
    res.status(500).json({
      message: "Internal server error"
    });
  }
}

export const getChildrenByUserId: RequestHandler = async (req, res) => {
  try{
    const data = await Child.find({ user: req.params.userId }).populate("user");
    res.json(data);
  }
  catch(err: any){
    console.error(err.message);
    res.status(500).json({ message: err.message });
  }
}