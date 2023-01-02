// import express

const express=require('express')

// import core
const path = require('path')

const cors=require('cors')






// import jwt

const jwt=require('jsonwebtoken')
// 

const {url}=require("./config/db.config")
const {  mongoose } = require('mongoose')
// create server app

const app=express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(cors({
    origin:['http://localhost:4200']
}))

//  app.use('/uploads/',express.static(path.join(__dirname, 'uploads')))

// public folder



const userRouter=require('./routes/user.routes')
const categoryRouter=require('./routes/category.routes')
const categoryItemRouter=require('./routes/category.items.routes')

app.use('/api/user',userRouter())
app.use('/api/category',categoryRouter())
app.use('/api/categoryitem',categoryItemRouter())
app.use('/uploads',express.static('uploads'))

// mongoose connect

mongoose.connect(url,()=>{
    console.log("Data Base connected")
})

// set up port number

app.listen(3000,()=>{
    console.log("Server started at port 3000 ")
})