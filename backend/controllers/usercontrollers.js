const User= require('../models/user')



const test = (req,res) =>{
    res.json('test is working')
}

const registeruser = async(req,res) =>{

    try{
        const{email,nic,name,password,address,number} =req.body;
        if(!email){
            return res.json({
                error:"name is required"
            })
        };
        //check is password is good
        if(!password || password.length <6){
            return res.json({
                error:"password is required and"
            })
        };
        //check email
        const exist =await user.findOne({email});
        if(exist){
            return res.json({
                error:"Email is taken"
            })
        }
        const user = await user.create({
            email,nic,name,password,address,number
        })

        return res.json(user)
    }catch(error){

        console.log(error)
    }

}

module.exports ={
    test,
    registeruser
}