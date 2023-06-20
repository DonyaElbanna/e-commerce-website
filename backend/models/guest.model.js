const mongoose = require('mongoose')

const {Schema} = mongoose

const guestSchema = new Schema({
  userName:{
    type: String,
    required: true
  },
  orders:{
    type: Array
  },
  wishlists:{
    type: Array
  },
  position:{
    type: String,
    default: "guest"
  }
})

const Guest = mongoose.model("Guest", guestSchema)
module.exports = Guest