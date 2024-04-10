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
        const{email,nic,name,password,number,role,gender} =req.body;
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
            gender
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

            const accessToken = jwt.sign({email: email},"nipun",{expiresIn:'1m'})
            const refreshToken = jwt.sign({email: email},"lahiru",{expiresIn:'5m'})
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
    const {email,nic,name,password,number,role,gender} =req.body;
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
            gender
           
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



module.exports ={
    test,
    registeruser,
    loginUser,
    updateUser,
    delterUser,
    getbyId,
    getAllUsers,auth
  
}