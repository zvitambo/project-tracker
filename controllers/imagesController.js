const path = require("path");
const fs = require("fs");
const Image = require("../models/Image");
const { StatusCodes } = require("http-status-codes");
const {
  BadRequestError,
  UnauthenticatedError,
  NotFoundError,
} = require("../errors");
const checkPermissions = require("../utils/checkPermissions");

const saveImage = async (req, res) => {
  if (!req.files) {
    throw new BadRequestError("No File Uploaded");
  }
  const itemImage = req.files.image;
  if (!itemImage.mimetype.startsWith("image")) {
    throw new BadRequestError("Please Upload Image");
  }

  const maxSize = 1024 * 1024;
  if (itemImage.size > maxSize) {
    throw new CustomError.BadRequestError("Please upload image smaller 1MB");
  }
  const imagePath = path.join(
    __dirname,
    "../public/uploads/" + `${itemImage.name}`
  );
  await itemImage.mv(imagePath);
  const itemImageUrl = `/uploads/${itemImage.name}`;

  return res.status(StatusCodes.OK).json({ src: itemImageUrl });
};



const createImage = async (req, res) => {
 
  const { name, description, status, uuid , url} = req.body;
  if (!name || !description || !status || !uuid || !url)
    throw new BadRequestError("Please provide all values");
  req.body.createdBy = req.user.userId;
  req.body.image_owner = uuid;
  const image = await Image.create(req.body);
  return res.status(StatusCodes.OK).json({ image });
};


const getImageUrls = async (req, res) => {
  const { uuid } = req.query;
  if (!uuid) throw new BadRequestError("Please Provide Image Owner uuid");
  const images = await Image.find({ image_owner: uuid });

  if (!images) throw new NotFoundError(`No images found for this item`);

  res.status(StatusCodes.OK).json({ images });
};

const deleteImage = async (req, res) => {
  const { id: imageId } = req.params;
  const image = await Image.findOne({ _id: imageId });
  if (!image) throw new NotFoundError(`No image with id ${imageId} found`);
  checkPermissions(req.user, image.createdBy);

  const filePath = image.url;
  await image.remove();
  if (fs.existsSync(filePath)) {
    // The file exists, so you can proceed with deleting it
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error(err);
        return;
      }

      console.log("File deleted successfully");
    });
  }
  res.status(StatusCodes.OK).json({ msg: "Success! Image removed" });
};

module.exports = { saveImage,createImage,  getImageUrls, deleteImage };




