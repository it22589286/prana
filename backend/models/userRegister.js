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
            required:true

        },
        address:{
            type:String,
            required:true

        },
        number:{
            type:String,
            required:true

        }
    }
)

const userModel =mongoose.model('user',userSchema)
module.exports = userModel;
