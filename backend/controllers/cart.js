const CartItem= require('../models/cart')
const path = require('path');

const test = (req, res) => {
  res.json({
    message: "API is working",
  });
};

const createCartItem = async (req, res) => {
  try {
    const { name, itemcode, count, price, colour, quantity } = req.body;
    let image;

    if (req.file) {
      image = req.file.filename;
    } else {
      image = 'default_image.jpg'; 
    }

    const existingCartItem = await CartItem.findOne({ itemcode });

    if (existingCartItem) {
      return res.status(400).json({ message: "Cart item already exists" });
    }

    const newCartItem = new CartItem({
      name,
      itemcode,
      count,
      price,
      colour,
      quantity,
      image,
    });

    await newCartItem.save();

    res.status(201).json({ message: "Cart item created successfully", cartItem: newCartItem });
  } catch (error) {
    console.error("Error creating cart item:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteCartItem = async (req, res) => {
  try {
    const { id } = req.params;
    const cartItem = await CartItem.findById(id);

    if (!cartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    await CartItem.findByIdAndDelete(id);

    res.status(200).json({ message: "Cart item deleted successfully" });
  } catch (error) {
    console.error("Error deleting cart item:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Function to get a cart item by ID
const getCartItemById = async (req, res) => {
  try {
    const { id } = req.params;
    const cartItem = await CartItem.findById(id);

    if (!cartItem) {
      return res.status(404).json({ success: false, message: "Cart item not found" });
    }

    res.json({ success: true, cartItem });
  } catch (error) {
    console.error("Error retrieving cart item by ID:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Function to get all cart items
const getAllCartItems = async (req, res) => {
  try {
    const allCartItems = await CartItem.find({});
    res.json(allCartItems);
  } catch (error) {
    console.error("Error retrieving cart items:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

module.exports ={
  createCartItem,
  deleteCartItem,
  getCartItemById,
  getAllCartItems,


}
