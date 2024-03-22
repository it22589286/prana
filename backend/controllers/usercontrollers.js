const User= require('../models/user')
const {hashPassword,comparePassword} =require('../helpers/auth')
const jwt = require("jsonwebtoken")


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
                error:"Email is taken"
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
             
          res.json('passwrod match')
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
    const {nic,name,password,number,role,gender} =req.body;
    let user;
    try{

       
      

        user = await User.findByIdAndUpdate(id,{
            email,
            nic,
            name,
            password,
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



module.exports ={
    test,
    registeruser,
    loginUser,
    updateUser,
    delterUser,
    getbyId
  
}