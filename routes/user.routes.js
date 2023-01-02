const express=require('express')
const {registerUser, loginUser, userValidation}=require('../controler/user.controler')
const router=express.Router()

module.exports=(()=>{
    router.post('/register',registerUser),
    router.post('/login',loginUser)
    return router
})