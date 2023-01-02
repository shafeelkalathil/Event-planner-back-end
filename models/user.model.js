const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
    phno:{type:String,required:true},
    userName:{type:String,required:true},
    password:{type:String,required:true}
})

module.exports=mongoose.model("users",userSchema)