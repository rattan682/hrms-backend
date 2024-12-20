const mongoose =require("mongoose")
const attendenceModel=new mongoose.Schema({
    e_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"employees"
    },
    task:String,
    status:String,

})
module.exports=mongoose.model("attendence",attendenceModel)