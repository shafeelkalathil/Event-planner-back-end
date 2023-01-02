const mongoose=require('mongoose')

const categorySchema=new mongoose.Schema({
    categoryId:{type:Number,required:true},
    categoryName:{type:String,required:true},
    image:{type:String,required:true}

})

module.exports=mongoose.model("categories",categorySchema)