const mongoose=require("mongoose")
const connectDb=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("datebase connected")
    } catch (error) {
        console.log(error.message)
        
    }
}
module.exports=connectDb