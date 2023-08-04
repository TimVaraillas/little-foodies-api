import mongoose from 'mongoose';

const tasteSchema = new mongoose.Schema({
  child: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Child',
    required: true
  },
  food: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Food',
    required: true
  },
  rating: {
    type: Number, 
    required: true
  },
  date: {
    type: Date,
    required: true
  } 
});

export const Food = mongoose.model("Food", tasteSchema);