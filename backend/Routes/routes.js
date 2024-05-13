const express = require("express")
const router = express.Router();
const cors = require('cors');
const {test,registeruser,loginUser,updateUser,delterUser,getbyId,getAllUsers,auth,forgotPassword,resetPassword,updateAttendance} =require('../controllers/usercontrollers')

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
router.put('/updateAttendance/:id',updateAttendance)
router.delete('/:id',delterUser)
router.get('/getUser/:id',getbyId)
router.get('/dashboard',auth)
router.get('/instructor',auth)
router.get('/supplier',auth)
router.post('/forgot-password',forgotPassword)
router.post('/resetpassword/:id/:token',resetPassword)



module.exports =router
