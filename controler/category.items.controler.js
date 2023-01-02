const categoryItemSchema=require('../models/category.items.model')

const helper=require('../helper/helper')

const {validationResult, body}=require('express-validator')


// categoryItemValidation
const categoryItemValidation=(method)=>{
    switch(method){
        case 'add':{
            return[
                body("categoryId","Category ID Is Required").exists(),
                body("companyName","Company Name Is Required").exists(),
                body("description","Description Is Required").exists(),
                body("image","Company Image Is Required").exists()
            ]
        }
    }
}

// register category items


const registerCategoryItems=async(req,res)=>{
    try{
        const error=validationResult(req)
        if(!error.isEmpty()){
            helper.deliverResponse(res,200,{},{
                error_code:90,
                error_message:"Validation Error"
            })
        }else{
            const{body}=req
            const categoryItemExsits=await categoryItemSchema.findOne({companyName:body.companyName})
            if(categoryItemExsits){
                helper.deliverResponse(res,200,{},{
                    error_code:90,
                    error_message:"Category Item Already Found.."
                })
            }else{
                const categoryItem=categoryItemSchema(body)
                if(req.file){
                    categoryItem.image=req.file.filename
                }
                await categoryItem.save()
                helper.deliverResponse(res,200,categoryItem)
            }
        }
    }catch(err){
        helper.deliverResponse(res,200,{},{
            error_code:90,
            error_message:"Failed To Register Category Item"
        })
    }
}


// get  category items

const getAllCategoryItems=async(req,res)=>{
  try{
      const categoryItems=await categoryItemSchema.find({})
      
      helper.deliverResponse(res,200,categoryItems)
  }catch{
        helper.deliverResponse(res,200,{},{
             error_code:90,
             error_message:"Category Item Not Found...."
        })
  }
}

module.exports=({
    categoryItemValidation,
    registerCategoryItems,
    getAllCategoryItems
})