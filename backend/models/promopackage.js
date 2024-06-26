const mongoose= require('mongoose');

const Schema= mongoose.Schema;

const promopackageSchema=new Schema({
     
    pid: {
        type : String,
        required : true
    }, 
    name:{
        type:String,
        required: true
    },
    description: {
        type : String,
        required : true
    },
    price: {
        type : Number,
        required : true
    },
    validity:{
        type:String,
        required:true
    },
    image: {
        type : String,
        required : true
    }
   
    
});

module.exports=mongoose.model("promopackage", promopackageSchema);