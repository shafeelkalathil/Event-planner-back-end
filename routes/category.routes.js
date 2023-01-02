const express=require('express')
const{registerCategory, getAllCategory,updateImage, getImage}=require('../controler/category.controler')
const upload=require('../helper/upload')
const router=express.Router()

module.exports=(()=>{
    router.post('/',upload.single('image'),registerCategory)
    router.get('/',getAllCategory)
    // router.post('/image',upload.single('Img'), updateImage);
    // router.get('/image',getImage)
    return router
})