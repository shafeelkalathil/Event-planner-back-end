const userSchema=require('../models/user.model')
const{body,validationResult}=require('express-validator')
const helper=require('../helper/helper')
const userValidation=(method)=>{
    switch(method){
        case 'add':{
            return[
                body("phno","Mobile Number is Required").exists(),
                body("userName","User Name is Required").exists(),
                body("password","Password is Required").exists()
            ]
        }
        case 'check':{
            return[
                body("phno","Phone Number is Required").exists(),
                body("password","Password is required").exists()
            ]
        }
    }
}
// register user
const registerUser=async(req,res)=>{
   try{
      const error=validationResult(req)
      if(!error.isEmpty()){
        helper.deliverResponse(res,200,{},{
            error_code:90,
            error_message:"Validation Error"
        })
        return;
      }
      else{
        const {body}=req
        const userExsits=await userSchema.findOne({phno:body.phno})
        if(userExsits){
            helper.deliverResponse(res,200,{},{
                error_code:90,
                error_message:"User Has Already Found"
            })
            return;
        }else{
            const user=new userSchema(body)
            await user.save()
            helper.deliverResponse(res,200,user)
        }
      }
   }catch(err){
    console.log(err)
    helper.deliverResponse(res,200,{},{
        error_code:90,
        error_message:"Failed To Register"
    })

   }
}

// loginuser

const loginUser=async(req,res)=>{
    try{
        const error=validationResult(req)
        if(!error.isEmpty()){
            helper.deliverResponse(res,200,error,{
                error_code:90,
                error_message:"Validation Error"

            })
            return;
        }else{
            const{body}=req
            const User=await userSchema.findOne({
                $or:[{phno:body.phno},
                    {password:body.password}]
            })
            if(User){
                helper.deliverResponse(res,200,error,{
                    error_code:90,
                    error_message:"Login Sucessfully..."
                })
            }else{
                helper.deliverResponse(res,200,error,{
                    error_code:90,
                    error_message:"Incorrect Phone Number/Password"
                })
            }
        }
    }catch(err){
         helper.deliverResponse(res,200,error,{
            error_code:90,
            error_message:"Failed To Login"
         })
    }
    
}



module.exports=({
    userValidation,
    registerUser,
    loginUser
})