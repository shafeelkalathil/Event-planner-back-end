const mongoose=require('mongoose')

const categoryItemSchema=mongoose.Schema({
    categoryId:{type:Number,required:true},
    companyName:{type:String,required:true},
    description:{type:String,required:true},
    image:{type:String,required:true}
})

module.exports=mongoose.model("categoryitems",categoryItemSchema)