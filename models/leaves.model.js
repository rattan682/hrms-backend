const mongoose =require("mongoose")
const leavesModel=new mongoose.Schema({
    name:String,
    designation:String,
    startdate:Date,
    enddate:Date,
    reason:String,
    status:String,
    attachment:String

})
module.exports=mongoose.model("leaves",leavesModel)