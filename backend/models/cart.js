const mongoose =require('mongoose')

const cartItemSchema = new mongoose.Schema({
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
  quantity: {
    type: Number,
    required: true,
    default: 1, 
    min: 1, 
  },
});


const CartItemModel =mongoose.model('CartItem',cartItemSchema)
module.exports = CartItemModel;
