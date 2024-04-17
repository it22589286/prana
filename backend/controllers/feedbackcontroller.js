const UserFeedbacks = require("../models/feedback")
const Book = require("../models/user")

 const getAllFeedbacks= async(req,res,next)=>{
    //this route will provide all of the books

    let feedbacks;
    try{
        feedbacks= await Book.find();

    }catch(err){
        console.log(err);
        
    }
    if(!feedbacks){
        return res.status(404).json({message:"No products"})
    }
    return res.status(200).json({feedbacks})
};

const addFeedbacks = async(req,res,next)=>{
    let feedbacks;
    const {  userId,name,email,instructor,rating,feedback} =req.body;

    try{
       
      
        feedbacks= new UserFeedbacks({
            userId, 
            name,
            email,
            instructor,
            rating,
            feedback

        });
        await feedbacks.save();
    }catch(err){
        console.log(err);
    }

    if(!feedbacks){
        return res.status(500).json({message:'unable to read'})
    }
    return res.status(201).json({feedbacks})
};

const getFeedbacksByUserId = async(req,res,next) =>{
    const userId = req.params.userId;
    let feedbacks;

    try{
        feedbacks = await UserFeedbacks.find({userId:userId});
    }catch(err){
        console.log(err);
    }
    if(!feedbacks){
        return res.status(404).json({message:"not found"});
    }
    return res.status(200).json({feedbacks});
};

const updatefeedbacks =async(req,res,next)=>{
    const id =req.params.id;
    const {name,email,instructor,rating,feedback} =req.body;
    let feedbacks;
    try{
        feedbacks = await UserFeedbacks.findByIdAndUpdate(id,{
            name,
            email,
            instructor,
            rating,
            feedback
        });
        feedbacks= await feedbacks.save();
    }catch(err){
        console.log(err);
    }
    
    if(!feedbacks){
        return res.status(500).json({message:'unable to update'})
    }
    return res.status(200).json({feedbacks})
};

const deleteFeedbacks = async(req,res,next)=>{
    const id = req.params.id;
    let feedbacks;
    try{
        feedbacks =await UserFeedbacks.findByIdAndDelete(id);

    }catch(err){
        console.log(err);

    }
    if(!feedbacks){
        return res.status(404).json({message:'unable to delete'})
    }
    return res.status(200).json({feedbacks})
}

exports.getAllFeedbacks = getAllFeedbacks;
exports.addFeedbacks = addFeedbacks;
exports.getFeedbacksByUserId = getFeedbacksByUserId;
exports.updatefeedbacks = updatefeedbacks;
exports.deleteFeedbacks = deleteFeedbacks