const mongoose=require("mongoose")
const trainingschema=mongoose.Schema({
    name:String,
    email:String,
    date:String,
    time:String,
    r_type:String,
 
     
 
   

},{
    timestamps:true

})

const trainingmodel=mongoose.model("Tranings",trainingschema)

module.exports = trainingmodel;
