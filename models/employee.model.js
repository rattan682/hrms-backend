const mongoose =require("mongoose")
const employeesModel=new mongoose.Schema({
    pic:String,
    e_name:String,
    e_email:String,
    e_phone:Number,
    e_position:String,
    e_dept:String,
    e_joiningdate:Date,

})
module.exports=mongoose.model("employees",employeesModel)