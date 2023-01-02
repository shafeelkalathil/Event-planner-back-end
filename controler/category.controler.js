const categorySchema = require("../models/category.model");
const helper = require("../helper/helper");
const { validationResult, body } = require("express-validator");
const upload = require("../helper/upload");

const categoryValidation = (method) => {
  switch (method) {
    case "add": {
      return [
        body("categoryId", "Category ID Is Required").exists(),
        body("categoryName", "Category Name Is Required").exists(),
        body("image", "Category Image Is Requird").exists(),
      ];
    }
  }
};

const registerCategory = async (req, res) => {
  try {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      helper.deliverResponse(res, 200, error, {
        error_code: 90,
        error_message: "Validation Error",
      });
    } else {
      const { body } = req;
      const categoryExsits = await categorySchema.findOne({
        categoryId: body.categoryId,
      });
      if (categoryExsits) {
        helper.deliverResponse(res, 200, error, {
          error_code: 90,
          error_message: "Category Already Found....",
        });
      } else {
        const category = new categorySchema(body);
        category.categoryName=body.categoryName.toLowerCase()
        console.log("image file name"+JSON.stringify(req.file));
        if (req.file) {
          category.image = req.file.filename;
        }
      
        await category.save();
        helper.deliverResponse(res, 200, category);
      }
    }
  } catch (err) {
    console.log(err.message)
    helper.deliverResponse(
      res,
      200,
      {},
      {
        error_code: 90,
        errpr_message: "Failed To Register Category",
      }
    );
  }
};

const getAllCategory = async (req, res) => {
  try {
    
      
    
    const category = await categorySchema.find({});
    //  category.image = result.image;
    //  console.log(category.image)
    helper.deliverResponse(res, 200, category);
  } catch (err) {
    helper.deliverResponse(res, 500, {}, {
      error_code: 90,
      error_message: "Failed To Get Category",
    });
  }
};

module.exports = {
  categoryValidation,
  registerCategory,
  getAllCategory,
};
