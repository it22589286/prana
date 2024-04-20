const express= require("express");
const router=express.Router();
const cors = require('cors');

//middleware
router.use(
    cors({
        credentials:true,
        origin:'http://localhost:3000'

    })
)

//const promopackage =require ("../models/promopackage");
const promopackagesController=require("../controllers/promo-controller");

router.get( "/" ,promopackagesController.getAllpromopackages);
router.post( "/" ,promopackagesController.addpromopackages);
router.get("/:id",promopackagesController.getbyId);
router.put("/:id",promopackagesController.updatepromopackage);
router.delete("/:id",promopackagesController.deletepromopackage);
module.exports=router;