const Category = require("../models/category.model");

const createCategory = async(payload)=>{
    return await Category.create(payload);
}


export default { createCategory};
