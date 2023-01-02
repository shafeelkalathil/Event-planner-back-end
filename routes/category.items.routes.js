const express=require('express')
const { registerCategoryItems, getAllCategoryItems } = require('../controler/category.items.controler')
const upload=require('../helper/upload')
const router=express.Router()

module.exports=(()=>{
    router.post('/',upload.single('image'),registerCategoryItems)
    router.get('/',getAllCategoryItems)
    return router
})