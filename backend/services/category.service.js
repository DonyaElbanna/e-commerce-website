const Category = require("../models/category.model");

const createCategory = async()=>{
    return await Category.create(req.body);
}


export default { createCategory};
