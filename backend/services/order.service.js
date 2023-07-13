const attractionModel = require("../models/attraction.model");
const Order = require("../models/order.model");
const User = require("../models/user.model");
const AppError = require("../utils/AppError.util");
const { NOT_FOUND } = require("../utils/namespace.util").namespace;

const add = async (payload, next) => {
  console.log(payload)
  try {
    const newOrder = await Order.create({
      user: payload.userId,
      guest:payload.userId,
      attraction: payload.attr._id,
      travelDate: payload.date,
      adultCount: payload.adults,
      childCount: payload.childNo,
      AdultTotalPrice: payload.adultPrice,
      ChildTotalPrice: payload.childPrice,
      totalPrice: payload.adultPrice + payload.childPrice,
      bookingRefId:"108080604",
      barCodeImagePath:"https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=Example",
      ticketNumber:"e78n66w87",
      LogoImage:"https://res.cloudinary.com/dc2rtsfhi/image/upload/v1689256910/logo1_cen4ps.jpg",
      MainImage:payload.attr.Images[0],
      email:payload.email,
      tourname:payload.attr.name
    });
    // const updatedUser = await User.findOneAndUpdate(
    //   { _id: payload.id },
    //   { $addToSet: { orders: newOrder._id } },
    //   { new: true }
    // );
    return newOrder;
  } catch (err) {
    console.log(err);
    return next(new AppError(NOT_FOUND, 404));
  }
};

const getOrders = async (next) => {
  try {
    const orders = await Order.find().populate("user").populate("attraction");
    return orders;
  } catch (err) {
    return next(new AppError(NOT_FOUND, 404));
  }
};

const getOrder = async (id, next) => {
  try {
    const order = await Order.findById(id)
      .populate("user")
      .populate("attraction");
    return order;
  } catch (err) {
    return next(new AppError(NOT_FOUND, 404));
  }
};

const edit = async (payload, id, next) => {
  try {
    const editedOrder = await Order.findByIdAndUpdate(
      id,
      {
        adultCount: payload.adults,
        childCount: payload.children,
        AdultTotalPrice: payload.adultPrice,
        ChildTotalPrice: payload.childPrice,
        totalPrice: payload.adultPrice + payload.childPrice,
      },
      {
        upsert: true,
        new: true,
      }
    );
    return editedOrder;
  } catch (err) {
    return next(new AppError(NOT_FOUND, 404));
  }
};

const remove = async (id, orderID, next) => {
  try {
    const order = await Order.findByIdAndDelete(orderID);
    const updatedUser = await User.findOneAndUpdate(
      { _id: id },
      { $pull: { orders: orderID } },
      {
        upsert: true,
        new: true,
      }
    );
    return { order, updatedUser };
  } catch (err) {
    return next(new AppError(NOT_FOUND, 404));
  }
};

module.exports = { add, getOrders, getOrder, remove, edit };
