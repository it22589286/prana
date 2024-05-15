const RequestItem = require('../models/RequestItem');

// Function to test if API is working
const test = (req, res) => {
  res.json({
    message: "API is working",
  });
};

// Function to create a new request item
const createRequestItem = async (req, res) => {
  try {
    const { name, count, color, expireDate, quantity } = req.body;

    const existingRequestItem = await RequestItem.findOne({ name });

    if (existingRequestItem) {
      return res.status(400).json({ message: "Request item already exists" });
    }

    const newRequestItem = new RequestItem({
      name,
      count,
      color,
      expireDate,
      quantity,
    });

    await newRequestItem.save();

    res.status(201).json({ message: "Request item created successfully", requestItem: newRequestItem });
  } catch (error) {
    console.error("Error creating request item:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Function to delete a request item by ID
const deleteRequestItem = async (req, res) => {
  try {
    const { id } = req.params;
    const requestItem = await RequestItem.findById(id);

    if (!requestItem) {
      return res.status(404).json({ message: "Request item not found" });
    }

    await RequestItem.findByIdAndDelete(id);

    res.status(200).json({ message: "Request item deleted successfully" });
  } catch (error) {
    console.error("Error deleting request item:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Function to get a request item by ID
const getRequestItemById = async (req, res) => {
  try {
    const { id } = req.params;
    const requestItem = await RequestItem.findById(id);

    if (!requestItem) {
      return res.status(404).json({ success: false, message: "Request item not found" });
    }

    res.json({ success: true, requestItem });
  } catch (error) {
    console.error("Error retrieving request item by ID:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Function to get all request items
const getAllRequestItems = async (req, res) => {
  try {
    const allRequestItems = await RequestItem.find({});
    res.json(allRequestItems);
  } catch (error) {
    console.error("Error retrieving request items:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = {
  test,
  createRequestItem,
  deleteRequestItem,
  getRequestItemById,
  getAllRequestItems,
};
