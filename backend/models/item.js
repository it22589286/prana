const mongoose =require('mongoose')

const itemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    itemcode: {
      type: String,
      required: true,
      unique: true,
    },
    count: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    colour: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      
    },
  },
  { timestamps: true }
);


const ItemModel =mongoose.model('item',itemSchema)
module.exports = ItemModel;