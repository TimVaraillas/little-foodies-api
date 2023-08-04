import mongoose from 'mongoose';

const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Category'
  },
  season: {
    type: [{ type: String, enum: ["spring", "summer", "automn", "winter"] }],
    default: []    
  },
  introductory_month: {
    type: Number, 
    required: true
  },
  main_allergens: {
    type: Boolean,
    required: true
  },
  image: {
    type: String
  }
    
});

export const Food = mongoose.model("Food", foodSchema);