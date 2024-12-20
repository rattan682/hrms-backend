const mongoose =require("mongoose")
const candidateModel=new mongoose.Schema({
    srnumber:Number,
    c_name:String,
    c_email:String,
    c_phone:Number,
    c_position:String,
    c_status:String,
    c_experience:String,
    c_resume:String,
})
module.exports=mongoose.model("candidate",candidateModel)