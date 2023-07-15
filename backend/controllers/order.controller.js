const AppError = require("../utils/AppError.util");
const { FAILURE } = require("../utils/namespace.util").namespace;
const Order = require("../models/order.model");
const User = require("../models/user.model");
const Guest = require("../models/guest.model");
const Attraction = require("../models/attraction.model");
const {
  add,
  getOrders,
  getOrder,
  remove,
  edit,
} = require("../services/order.service");

const addOrder = async (req, res, next) => {
  // const { id } = req.params;
  const { attrID, adults, children, expectedDate,email} = req.body;
  const user = await User.findById( res.locals.decodedToken._id ) || await Guest.findById(res.locals.decodedToken._id) ;
  const attr = await Attraction.findById(attrID); 
  const details = {
    userId:res.locals.decodedToken._id,
    date: new Date(expectedDate), 
    adults,
    childNo: attr.childAvailable ? children : 0,
    adultPrice: attr.AdultPrice * adults || 0,
    childPrice: attr.ChildPrice * children || 0,
    attr,
    email
  };

  if (user && attr && attr.status == "available") {
    try {
      const newOrder = await add(details, next);
      res.status(201).json(newOrder);
    } catch (err) {
      console.log(err);
      return next(new AppError(FAILURE, 404));
    }
  } else if (attr.status == "notAvailable") {
    return next(new AppError("This attraction is currently unavailable", 404));
  } else {
    return next(new AppError(FAILURE, 404));
  }
};

const getAllOrders = async (req, res, next) => {
  try {
    const orders = await getOrders(next);
    res.status(200).json(orders);
  } catch (error) {
    return next(new AppError(FAILURE, 404));
  }
};

const getSingleOrder = async (req, res, next) => {
  const { id } = req.params;
  try {
    const order = await getOrder(id);
    if (!order) {
      return next(new AppError(FAILURE, 404));
    }
    res.status(200).json(order);
  } catch (err) {
    return next(new AppError(FAILURE, 404));
  }
};

const editOrder = async (req, res, next) => {
  const { id } = req.params;
  const { adults, children } = req.body;
  const order = await Order.findById(id);
  const attrID = order["attraction"];
  const attr = await Attraction.findById(attrID);

  const details = {
    date: new Date(),
    adults,
    children,
    adultPrice: attr.AdultPrice * adults,
    childPrice: attr.ChildPrice * children,
  };

  try {
    const editedOrder = await edit(details, id, next);
    res.status(202).json(editedOrder);
  } catch (err) {
    return next(new AppError(FAILURE, 404));
  }
};

const deleteOrder = async (req, res, next) => {
  const { id, orderID } = req.params;
  // const id = res.locals.decodedToken._id;
  // const orderID = req.params;

  try {
    const deletedOrder = await remove(id, orderID, next);
    res.status(200).json(deletedOrder);
  } catch (err) {
    return next(new AppError(FAILURE, 404));
  }
};

module.exports = {
  getAllOrders,
  getSingleOrder,
  addOrder,
  editOrder,
  deleteOrder,
};
