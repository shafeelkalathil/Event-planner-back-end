const path=require('path')
const multer=require('multer')
const helper=require('./helper')

var storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'uploads/')
    },
    filename:(req,file,cb)=>{
        let ext=file.originalname
        cb(null,Date.now() + ext)
    }
})

var upload=multer({
    storage:storage,
    fileFilter:(req,file,cb)=>{
        if(
            file.mimetype=="image/jpg"||
            file.mimetype=="image/png"
        ){
            cb(null,true)
        }else{
           console.log("Incorrect File Format")
           cb(null,false)
        }
    }
    // ,limits:{
    //    fileSize:1024*1024*2
    // }
})

module.exports=upload