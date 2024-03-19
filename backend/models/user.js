const mongoose =require('mongoose')


const {Schema} = mongoose

const userSchema = new Schema(
    {
        email:{
            type:String,
            unique:true
        },
        nic:{
            type:String,
            required:true
        },
        name:{
            type:String,
            required:true

        },
        password:{
            type:String,
          

        },
       
        number:{
            type:String,
            required:true

        },
        role:{
            type:String,
            required:true

        },
        gender:{
            type:String,
            required:true

        }
    }
)

const userModel =mongoose.model('User',userSchema)
module.exports = userModel;
