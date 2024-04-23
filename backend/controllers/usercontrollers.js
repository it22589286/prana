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
        const identity =await User.findOne({nic});
        if(identity){
            return res.json({
                error:"Your nic has previously used"
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
            const accessToken = jwt.sign({email: email, id: user._id},"nipun",{expiresIn:'1m'})
            const refreshToken = jwt.sign({email: email, id: user._id},"lahiru",{expiresIn:'5m'})
            res.cookie('accessToken',accessToken,{maxAge:60000})
            res.cookie('refreshToken',refreshToken,{maxAge:300000,httpOnly:true,secure:true,sameSite:'strict'})

            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                  user: 'youremail@gmail.com',
                  pass: 'yourpassword'
                }
              });
              
              var mailOptions = {
                from: 'youremail@gmail.com',
                to: 'myfriend@yahoo.com',
                subject: 'Reset Password',
                text: `http://localhost:3000/resetpassword/${user._id}/${accessToken}`
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

    const resetPassword = (req,res) =>{

        const {id,token} = req.params;
        const {password} = req.body;
       
        jwt.verify(token,'nipun',(err,decoded)=>{
            if(err){
                return res.json({message:"invalid token"})
            }
            else{
                const hashedPassword=hashPassword(password)
                const user =  User.findByIdAndUpdate({_id: id},{
                    password:hashedPassword
                });
                user=  user.save()
                return res.json({message:"password updated"})
            }
        })

    }
    


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
    forgotPassword
  
}