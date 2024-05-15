const Item = require("../models/item");
const path = require('path');

const createItem = async (req, res) => {
  req.body.image = req.file.filename;
  console.log(req.body.image);
  const { name, itemcode, count, price, colour, image } = req.body;

  try {
    const newItem = new Item({ name, itemcode, count, price, colour, image });
    await newItem.save();
    res.status(201).json({
      success: true,
      message: "Item created successfully",
      item: newItem,
    });
  } catch (error) {
    console.error("Error creating item:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Function to get item image by filename
const getItemImage = (req, res) => {
  const { filename } = req.params;
  const imagePath = path.join(__dirname, '../public/images', filename); // Assuming images are stored in the 'public/images' directory

  res.sendFile(imagePath);
};



const getAllItems = async (req, res) => {
  try {
    const allItems = await Item.find({});
    res.json(allItems);
  } catch (error) {
    console.error("Error retrieving items:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const getItemById = async (req, res) => {
  const { id } = req.params;

  try {
    const item = await Item.findById(id);
    if (!item) {
      return res
        .status(404)
        .json({ success: false, message: "Item not found" });
    }
    res.json({ success: true, item });
  } catch (error) {
    console.error("Error retrieving item by ID:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const updateItem = async (req, res) => {
  const { id } = req.params;
  const { name, itemcode, count, price, colour } = req.body;

  try {
    const updatedFields = { name, itemcode, count, price, colour };
    const updatedItem = await Item.findByIdAndUpdate(id, updatedFields, {
      new: true,
    });
    if (!updatedItem) {
      return res
        .status(404)
        .json({ success: false, message: "Item not found" });
    }
    res.json({
      success: true,
      message: "Item updated successfully",
      item: updatedItem,
    });
  } catch (error) {
    console.error("Error updating item:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const deleteItem = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedItem = await Item.findByIdAndDelete(id);
    if (!deletedItem) {
      return res
        .status(404)
        .json({ success: false, message: "Item not found" });
    }
    res.json({ success: true, message: "Item deleted successfully" });
  } catch (error) {
    console.error("Error deleting item:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = {
  createItem,
  getAllItems,
  getItemById,
  updateItem,
  deleteItem,
  getItemImage
};
