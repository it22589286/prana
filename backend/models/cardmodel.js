const mongoose=require("mongoose")
const customersschema=mongoose.Schema({
    usename:String,
    type:String,
    card_type:String,
    card_holder:String,
    card_number:String,
    expir_date:String,
    cvc:String,
    pay:String,
 
 

  
   
   
   

},{
    timestamps:true

})

const customermodel=mongoose.model("Payments",customersschema)
module.exports = customermodel;