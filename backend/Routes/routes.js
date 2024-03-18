const express = require("express")
const router = express.Router();
const cors = require('cors');
const {test,registeruser} =require('../controllers/usercontrollers')

router.use(
    cors({
        credentials:true,
        origin:'http://localhost:3000'

    })
)

router.get('/',test)
router.post('/register',registeruser)

module.exports =router
