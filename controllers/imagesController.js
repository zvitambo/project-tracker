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
const Feature = require("../models/Feature");
const Project = require("../models/Project");
const CreditTransaction = require("../models/CreditTransaction");
const DebitTransaction = require("../models/DebitTransaction");

const saveImage = async (req, res) => {
  if (!req.files) {
    throw new BadRequestError("No File Uploaded");
  }

  const itemImage = req.files.image;
  if (!itemImage.mimetype.startsWith("image")) {
    throw new BadRequestError("Please Upload Image");
  }

  const maxSize = 1024 * 1024;
  // if (itemImage.size > maxSize) {
  //   throw new BadRequestError("Please upload image smaller 1MB");
  // }

  //const baseUrl = req.headers.get("origin");

  
  const imagePath = path.join(
    __dirname,
    "../public/uploads/" + `${itemImage.name}`
  );

  //jindu-project-tracker.onrender.com/api/v1/images/save
  // ENOENT: no such file or directory, open '/opt/render/project/src/public/uploads/59.jpg'

  https: await itemImage.mv(imagePath);
  const itemImageUrl = `/uploads/${itemImage.name}`;

  return res
    .status(StatusCodes.OK)
    .json({ image: { name: itemImage.name, src: itemImageUrl } });
};

const createImage = async (req, res) => {
  const { name, description, status, uuid, url } = req.body;
  if (!name || !description || !status || !uuid || !url)
    throw new BadRequestError("Please provide all values");
  req.body.createdBy = req.user.userId;
  req.body.image_owner = uuid;
  const image = await Image.create(req.body);
  return res.status(StatusCodes.OK).json({ image });
};

const getImageUrls = async (req, res) => {
  const { uuid, featureId, projectId, debit, credit } = req.query;

  const images = [];

  if (featureId) {
    const feature = await Feature.findOne({ _id: featureId });

    if (feature){
      const debitTransactions = await DebitTransaction.find({
        feature: feature,
      });

      if (debitTransactions) {
        for (let transaction of debitTransactions) {
          const image = await Image.findOne({
            image_owner: transaction.uuid,
          });
          image &&
            images.push({
              url: image?.url,
              name: image?.name,
              description: image?.description,
            });
        }
      }

      const featuresImages = await Image.find({
        image_owner: feature.uuid,
      });

      if (featuresImages) {
        for (let image of featuresImages) {
          image &&
            images.push({
              url: image?.url,
              name: image?.name,
              description: image?.description,
            });
        }
      }
    }
  }

  if (projectId) {
    const project = await Project.findOne({ _id: projectId });
    if (project) {
      const projectImages = await Image.find({
        image_owner: project.uuid,
      });

      if (projectImages) {
        for (let image of projectImages) {
          image &&
            images.push({
              url: image?.url,
              name: image?.name,
              description: image?.description,
            });
        }
      }
    }
  }

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

module.exports = { saveImage, createImage, getImageUrls, deleteImage };
