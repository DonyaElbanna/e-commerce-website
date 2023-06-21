const Guest = require("../models/guest.model");

const addGuest = async (payload) => {
  return await Guest.create(payload);
};

// export default { addGuest };
module.exports = { addGuest };
