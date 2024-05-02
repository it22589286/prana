const User= require('../models/user')
const {hashPassword,comparePassword} =require('../helpers/auth')
const jwt = require("jsonwebtoken")
const cookieParser =require('cookie-parser')


const test = (req,res) =>{
    res.json('test is working')
}
//register endpoint

const registeruser = async(req,res) =>{

    try{
        const{email,nic,name,password,number,role,gender,attendance} =req.body;
        if(!name){
            return res.json({
                error:"name is required"
            })
        };
        if(!role){
            return res.json({
                error:"please select a role"
            })

           
        };

        if(!gender){
            return res.json({
                error:"please select your gender"
            })

           
        };
        //check lenght of number
        if(number.length !=10 ){
            return res.json({
                error:"lenght of the number should be 10 digits"
            })
        };
        
        //check is password is good
        if(!password ||password.length <6 ){
            return res.json({
                error:"password is required and should be at least 6 characters long"
            })
        };
        //check email
        const exist =await User.findOne({email});
        if(exist){
            return res.json({
                error:"Email is  already taken"
            })
        };

        //check nic exits
        const identity =await User.findOne({nic});
        if(identity){
            return res.json({
                error:"Your nic has previously used"
            })
        };

        //check lentgh of nic
        if( password.length > 15 ||password.length < 6 ){
            return res.json({
                error:"lenght of the nic should be 6-15 characters"
            })
        };
        const hashedPassword=await hashPassword(password)
        const user = await User.create({
            email,
            nic,
            name,
            password:hashedPassword,
            number,
            role,
            gender,
            attendance

        })

        return res.json(user)
    }catch(error){

        console.log(error)
    }

};

//login endpoint
const loginUser = async(req,res) =>{

    try{
        const {email,password} =req.body;
        
        //check if user exists
        const user = await User.findOne({email});
        if(!user){
            return res.json({
                error:'No user found'
            })
        }

        //check if password match

        const match = await comparePassword(password,user.password)
        if(match){

            const accessToken = jwt.sign({email: email, id: user._id},"nipun",{expiresIn:'1m'})
            const refreshToken = jwt.sign({email: email, id: user._id},"lahiru",{expiresIn:'5m'})
            res.cookie('accessToken',accessToken,{maxAge:60000})
            res.cookie('refreshToken',refreshToken,{maxAge:300000,httpOnly:true,secure:true,sameSite:'strict'})
          res.json(user)
        }
        if(!match){
            res.json({
                error:"passwords do not match"
            })
        }

    }
    catch(error){

        console.log(error)

    }

}

//update user endpoint

const updateUser =async(req,res,next)=>{
    const id =req.params.id;
    const {email,nic,name,password,number,role,gender,attendance} =req.body;
    let user;
    try{

         if(!password ||password.length <6 ){
            return res.json({
                error:"password is required and should be at least 6 characters long"
            })
        };

        if(nic !== nic){

        const identity =await User.findOne({nic});
        if(identity){
            return res.json({
                error:"Your nic has previously used"
            })
        }

    }

       
      
        const hashedPassword=await hashPassword(password)
        user = await User.findByIdAndUpdate(id,{
            email,
            nic,
            name,
            password:hashedPassword,
            number,
            role,
            gender,
            attendance
           
        });
        user= await user.save()
    }catch(err){
        console.log(err);
    }
    
    if(!user){
        return res.status(404).json({message:'unable to update'})
    }
    return res.status(200).json({user})
};

//delete user
 const delterUser = async(req,res,next)=>{
    const id = req.params.id;
    let user;

    try{
        user =await User.findByIdAndDelete(id);

    }catch(err){
        console.log(err);
    }
    if(!user){
        return res.status(404).json({meassage:'unable to delete'})
    }
    return res.status(200).json({user})
 };

 //get user by id

 const getbyId = async (req,res,next) =>{

    const id = req.params.id;
    let user;
    try{
        user = await User.findById(id);
    }
    catch(err){
        console.log(err);
    }
    if(!user){
        return res.status(404).json({message:'user not found'})
    }
    return res.status(200).json({user});
 };

 //get all the users at once

 const getAllUsers = async(req,res,next)=>{
    let user;
    try{
        user = await User.find();

    }
    catch(err){
        console.log(err);
    }
    if(!user){
        return res.status(404).json({message:'No users'})
    }
    return res.status(200).json({user})
 };

 //
 const varifyUser =(req,res,next) =>{

    const accessToken = req.cookies.accessToken;
    if(!accessToken){

        if(renewToken(req,res)){

            next()

        }

    }
    else{
        jwt.verify(accessToken,'nipun',(err,decoded)=>{
            if(err){
                return res.jason({valid:false,message:"invalid token"})
            }else{
                req.email = decoded.email
                next()
            }
        })
    }

 };

     const renewToken = (req,res) =>{

        const refreshToken = req.cookies.refreshToken;
        let exist = false;
        if(!accessToken){

            return res.json({valid:false,message:"no refresh token"})
    
        }
        else{
            jwt.verify(refreshToken,'lahiru',(err,decoded)=>{
                if(err){
                    return res.jason({valid:false,message:"invalid refresh token"})
                }else{

                    const accessToken = jwt.sign({email: email},"nipun",{expiresIn:'1m'})
                    res.cookie('accessToken',accessToken,{maxAge:60000})
                    exist = true;
                }
            })
        }

        return exist;

     }

 //

 const auth = (req,res) =>{

    return res.json({valid:true,message:"authorized"})
 }

 //forgot password

    const forgotPassword = async(req,res) =>{

        const {email} = req.body;
        let user;
        try{
            user = await User.findOne({email});
            if(!user){
                return res.status(404).json({message:'user not found'})
            }
            const token = jwt.sign({email: email, id: user._id},process.env.JWT_SECRET,{expiresIn:'10m'})
           
           
           
            var nodemailer = require('nodemailer');
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                  user: 'taprobanasl233@gmail.com',
                  pass: 'jskfmilkkykokfnj'
                }
              });
              
              var mailOptions = {
                from: 'pranayoga880@gmail.com',
                to: email,
                subject: 'Reset Password',
                text: `http://localhost:3000/reset-password/${user._id}/${token}`
              };
              
              transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log(error);
                } else {
                  return res.send({status:"success"})
                }
              });
            return res.status(200).json({message:'user found'})
        }
        catch(err){
            console.log(err);
        }

    };

    //reset password

    const resetPassword = async (req, res) => {
        try {
            const { id, token } = req.params;
            const { password } = req.body;
    
            // Verify the token
            jwt.verify(token,process.env.JWT_SECRET, async (err, decoded) => {
                if (err) {
                    console.error("JWT verification failed:", err);
                    return res.status(400).json({ message: "Invalid token" });
                }
    
                try {
                    // Hash the new password
                    const hashedPassword = await hashPassword(password);
    
                    // Update the user's password in the database
                    const user = await User.findByIdAndUpdate(id, {
                        password: hashedPassword
                    });
    
                    if (!user) {
                        return res.status(404).json({ message: 'User not found' });
                    }
    
                    return res.json({ message: "Password updated successfully" });
                } catch (error) {
                    console.error("Error updating password:", error);
                    return res.status(500).json({ error: "Internal Server Error" });
                }
            });
        } catch (error) {
            console.error("Unexpected error:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    };

    //
    const updateAttendance = async (req, res, next) => {
        const id = req.params.id;
        const { attendance } = req.body;
        try {
            // Find the user by ID
            let user = await User.findByIdAndUpdate(id, { attendance }, { new: true });
    
            // Check if the user exists
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
    
            // Return the updated user
            return res.status(200).json({ user });
        } catch (err) {
            console.error('Error updating attendance:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    };
    
    


module.exports ={
    test,
    registeruser,
    loginUser,
    updateUser,
    delterUser,
    getbyId,
    getAllUsers,
    auth,
    resetPassword,
    forgotPassword,
    updateAttendance
  
}