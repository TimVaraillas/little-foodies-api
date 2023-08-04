import mongoose from 'mongoose';
import dayjs from 'dayjs';
dayjs.locale("fr");

const childSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  birthday: {
    type: Date,
    required: true,
    get: (date: string) => dayjs(date).format("L")
  },
  gender: {
    type: String,
    required: true,
    enum: ['masculine', 'feminine']
  }, 
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
});

export const Child = mongoose.model("Child", childSchema);