const attractionModel = require("../models/attraction.model");

const addAttraction = async (payload) => {
   return await attractionModel.create(payload);
};
export default { addAttraction};
