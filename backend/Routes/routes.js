const express = require("express")
const router = express.Router();
const cors = require('cors');
const {test,registeruser,loginUser} =require('../controllers/usercontrollers')

//middleware
router.use(
    cors({
        credentials:true,
        origin:'http://localhost:3000'

    })
)

router.get('/',test)
router.post('/register',registeruser)
router.post('/login',loginUser)

module.exports =router
