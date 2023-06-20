const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
const attraction = require("../models/attraction.model");

cloudinary.config({
  cloud_name: "drntnt5uf",
  api_key: "593879962724196",
  api_secret: "Rd58ss7v9osOhM4cqAJHCjP-lx0",
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "DEV",
  },
});

const upload = multer({
  storage: storage,
});

const uploadToMulter = upload.array("picture");
const uploadPP = async (req, res, next) => {
  const urls = [];
  const files = req.files;
  for (const file of files) {
    const { path } = file;
    urls.push(path);
  }
  req.urls = urls;
  next();
};
module.exports = { uploadToMulter, uploadPP };
