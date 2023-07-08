const Order = require("../models/order.model");
const User = require("../models/user.model");
const AppError = require("../utils/AppError.util");
const { NOT_FOUND } = require("../utils/namespace.util").namespace;

const add = async (payload, next) => {
  try {
    const newOrder = await Order.create({
      user: payload.id,
      attraction: payload.attrID,
      travelDate: payload.date,
      adultCount: payload.adults,
      childCount: payload.childNo,
      AdultTotalPrice: payload.adultPrice,
      ChildTotalPrice: payload.childPrice,
      totalPrice: payload.adultPrice + payload.childPrice,
    });
    const updatedUser = await User.findOneAndUpdate(
      { _id: payload.id },
      { $addToSet: { orders: newOrder._id } },
      { new: true }
    );
    return { newOrder, updatedUser };
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
      { new: true }
    );
    return { order, updatedUser };
  } catch (err) {
    return next(new AppError(NOT_FOUND, 404));
  }
};

module.exports = { add, getOrders, getOrder, remove, edit };
