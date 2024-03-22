const express = require("express")
const router = express.Router();
const cors = require('cors');
const {test,registeruser,loginUser,updateUser,delterUser,getbyId} =require('../controllers/usercontrollers')

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
router.put('/update/:id',updateUser)
router.delete('/:id',delterUser)
router.get('/getUser/:id',getbyId)


module.exports =router
