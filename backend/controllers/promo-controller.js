const promopackage= require("../models/promopackage");
const getAllpromopackages= async(req,res,next) => {
    let promopackages;
    try{
        promopackages=await promopackage.find();

    }
    catch (err){
        console.log(err);
    }
    if(!promopackages){
        return res.status(404).json({message: "No Packages Found"});

    }
    return res.status(200).json({promopackages});
};
const getbyId=async(req,res,next)=>{
    const id= req.params.id;
    let promopackages;
    try{
        promopackages=await promopackage.findById(id);
    }
    catch(err){
        console.log(err);
    }
    
if (!promopackages){
    return res.status(404).json({message:"No packages found"});
}
return res.status(200).json({promopackages});

};
const addpromopackages=async(req,res,next)=>{
    const {pid,name,description,price,validity,image}=req.body
    let promopackages;
    try{
        promopackages=new promopackage({
            pid,
            name,
            description,
            price,
            validity,
            image
        });
        await promopackages.save();
    }catch(err){
console.log(err);
    }
    if(!promopackages){
        return res.status(500).json({message:'Unable to add'});
    }
    return res.status(201).json({promopackages});
};
const updatepromopackage=async(req,res,next)=>{
    const id =req.params.id;
    const {pid,name,description,price,validity,image}=req.body
    let promopackages;
    try{
        promopackages=await promopackage.findByIdAndUpdate(id,{
            pid,
            name,
            description,
            price,
            validity,
            image
        })
        promopackages=await promopackages.save()
    }catch(err){
        console.log(err);
            }
            if(!promopackages){
                return res.status(500).json({message:'Unable to Update'});
            }
            return res.status(201).json({promopackages});

};

const deletepromopackage=async(req,res,next)=>{
    const id=req.params.id;
    let promopackages;
    try{
        promopackages = await promopackage.findByIdAndDelete(id)
    }catch(err){
        console.log(err);
            }
            if(!promopackages){
                return res.status(500).json({message:'Unable to Delete'});
            }
            return res.status(201).json({message:'Package Successfully Deleted'});

};

exports.getAllpromopackages= getAllpromopackages;
exports.addpromopackages=addpromopackages;
exports.getbyId=getbyId;
exports.updatepromopackage=updatepromopackage;
exports.deletepromopackage=deletepromopackage;

