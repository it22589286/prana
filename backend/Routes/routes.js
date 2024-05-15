const express = require("express");
const router = express.Router();
const cors = require("cors");

const path = require("path")

const {
  test,
  registeruser,
  loginUser,
  updateUser,
  delterUser,
  getbyId,
  getAllUsers,
  auth,
} = require("../controllers/usercontrollers");
const {
  getAllItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
  getItemImage
} = require("../controllers/item");
const {
  createCartItem,
  deleteCartItem,
  getCartItemById,
  getAllCartItems,
} = require("../controllers/cart");
const {
  createRequestItem,
  deleteRequestItem,
  getRequestItemById,
  getAllRequestItems,
} = require("../controllers/RequestItem");

const multer = require("multer");

//middleware
router.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.fieldname + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

router.get("/", getAllUsers);
router.post("/register", registeruser);
router.post("/login", loginUser);
router.put("/update/:id", updateUser);
router.delete("/:id", delterUser);
router.get("/getUser/:id", getbyId);
router.get("/dashboard", auth);
router.get("/instructor", auth);
router.get("/supplier", auth);

// CRUD routes for items
router.get("/item", getAllItems);
router.get("/itembyid/:id", getItemById);
router.post("/itemcreate", upload.single("image"), createItem);
router.put("/updateitem/:id", updateItem);
router.delete("/deleteitem/:id", deleteItem);
router.get('/image/:filename',getItemImage);

// CRUD routes for carts
router.post("/cartcreate", upload.single("image"), createCartItem);
router.delete("/deletecart/:id", deleteCartItem);
router.get("/cartbyid/:id", getCartItemById);
router.get("/cart", getAllCartItems);

// CRUD routes for request items
router.post("/requestItem/create", createRequestItem);
router.delete("/requestItem/delete/:id", deleteRequestItem);
router.get("/requestItem/:id", getRequestItemById);
router.get("/requestItems", getAllRequestItems);

module.exports = router;
