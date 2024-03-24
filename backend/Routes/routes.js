const express = require("express")
const router = express.Router();
const cors = require('cors');
const {test,registeruser,loginUser,updateUser,delterUser,getbyId,getAllUsers} =require('../controllers/usercontrollers')

//middleware
router.use(
    cors({
        credentials:true,
        origin:'http://localhost:3000'

    })
)

router.get('/',getAllUsers)
router.post('/register',registeruser)
router.post('/login',loginUser)
router.put('/update/:id',updateUser)
router.delete('/:id',delterUser)
router.get('/getUser/:id',getbyId)



module.exports =router
