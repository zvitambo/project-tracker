
const Project = require("../models/Project");
const Feature = require("../models/Feature");
const { StatusCodes } = require("http-status-codes");
const {
  BadRequestError,
  UnauthenticatedError,
  NotFoundError,
} = require("../errors");
const checkPermissions = require("../utils/checkPermissions");
const mongoose = require("mongoose");
const moment = require("moment");



const getAllProjects = async (req, res) => {
  const { status, search, searchByProject, projectCategory, sort } = req.query;
  const queryObject = {
    createdBy: req.user.userId,
  };

  if (status && status !== "all") {
    queryObject.status = status;
  }

  if (projectCategory && projectCategory !== "all") {
    queryObject.projectCategory = projectCategory;
  }

  if (search) {
    queryObject.position = { $regex: search, $options: "i" };
  }

  if (searchByProject) {
    queryObject.name = { $regex: searchByProject, $options: "i" };
  }

  let result = Project.find(queryObject);

  if (sort && sort === "lastest") {
    result = result.sort("-createdAt");
  }
  if (sort && sort === "oldest") {
    result = result.sort("createdAt");
  }
  if (sort && sort === "a-z") {
    result = result.sort("name");
  }
  if (sort && sort === "z-a") {
    result = result.sort("-name");
  }

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 25;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);
  const projects = await result;
  const totalProjects = await Project.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalProjects / limit);
  res.status(StatusCodes.OK).json({ projects, totalProjects, numOfPages });
};

const createProject = async (req, res) => {
  const { name, description, category, status  } = req.body;
  if (!name || !description)
    throw new BadRequestError("Please provide all values");
  req.body.createdBy = req.user.userId;
  const project = await Project.create(req.body);
  res.status(StatusCodes.OK).json({ project });
};

const updateProject = async (req, res) => {
  const { id: projectId } = req.params;
  const { name, description, category, status } = req.body;
  if (!name || !description)
    throw new BadRequestError("Please Provide All Values");
  const project = await Project.findOne({ _id: projectId });

  if (!project) throw new NotFoundError(`No project with id ${projectId} found`);
  checkPermissions(req.user, project.createdBy);
  const updatedProject = await Project.findOneAndUpdate(
    { _id: projectId },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(StatusCodes.OK).json({ updatedProject });
};

const deleteProject = async (req, res) => {
  const { id: projectId } = req.params;
  const project = await Project.findOne({ _id: projectId });
  if (!project) throw new NotFoundError(`No project with id ${projectId} found`);
  checkPermissions(req.user, project.createdBy);
  await project.remove();
  res.status(StatusCodes.OK).json({ msg: "Success! Project removed" });
};

const showProjectStats = async (req, res) => {
  let stats = await Project.aggregate([
    { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
    { $group: { _id: "$status", count: { $sum: 1 } } },
  ]);
console.log(stats);
  stats = stats.reduce((acc, curr) => {
    const { _id: title, count } = curr;
    acc[title] = count;
    return acc;
  }, {});
  const defaultStats = {
    inprogress: stats["In Progress"] || 0,
    onhold: stats["Finished"] || 0,
    finished: stats["On Hold"] || 0,
  };
  let monthlyApplications = await Project.aggregate([
    { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
    {
      $group: {
        _id: {
          year: { $year: "$createdAt" },
          month: { $month: "$createdAt" },
        },
        count: { $sum: 1 },
      },
    },
    { $sort: { "_id.year": -1, "_id.month": -1 } },
    { $limit: 12 },
  ]);

  monthlyApplications = monthlyApplications
    .map((item) => {
      const {
        _id: { year, month },
        count,
      } = item;
      const date = moment()
        .month(month - 1)
        .year(year)
        .format("MMM Y");
      return { date, count };
    })
    .reverse();

  res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications });
};





const getAllProjectFeatures = async (req, res) => {
  const { status, search, searchByFeature, featureCategory, sort, project_id } =
    req.query;
    
  const queryObject = {
    createdBy: req.user.userId,
    project: project_id,
  };

  if (status && status !== "all") {
    queryObject.status = status;
  }

  if (featureCategory && featureCategory !== "all") {
    queryObject.featureCategory = featureCategory;
  }

  if (search) {
    queryObject.position = { $regex: search, $options: "i" };
  }

  if (searchByFeature) {
    queryObject.name = { $regex: searchByFeature, $options: "i" };
  }

  let result = Feature.find(queryObject);

  if (sort && sort === "lastest") {
    result = result.sort("-createdAt");
  }
  if (sort && sort === "oldest") {
    result = result.sort("createdAt");
  }
  if (sort && sort === "a-z") {
    result = result.sort("position");
  }
  if (sort && sort === "z-a") {
    result = result.sort("-position");
  }

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 25;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);
  const features = await result;
  const totalFeatures = await Feature.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalFeatures / limit);
  res.status(StatusCodes.OK).json({ features, totalFeatures, numOfPages });
};

const createProjectFeature = async (req, res) => {
  const { project_id } = req.params;
if (!project_id) throw new BadRequestError("Please provide a valid Project ID");
 const { name, description, category, status } = req.body;
 if (!name || !description)
   throw new BadRequestError("Please provide all values");
  req.body.createdBy = req.user.userId;
  req.body.project = project_id;
  const feature = await Feature.create(req.body);
  res.status(StatusCodes.OK).json({ feature });
};

const updateProjectFeature = async (req, res) => {
  const { id: featureId } = req.params;
  const { name, description, category, status } = req.body;
 if (!name || !description)
   throw new BadRequestError("Please provide all values");
  const feature = await Feature.findOne({ _id: featureId });

  if (!feature) throw new NotFoundError(`No feature with id ${jobId} found`);
  checkPermissions(req.user, feature.createdBy);
  const updatedFeature = await Feature.findOneAndUpdate(
    { _id: featureId },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(StatusCodes.OK).json({ updatedFeature });
};

const deleteProjectFeature = async (req, res) => {
  const { id: featureId } = req.params;
  const feature = await Feature.findOne({ _id: featureId });
  if (!feature) throw new NotFoundError(`No feature with id ${featureId} found`);
  checkPermissions(req.user, feature.createdBy);
  await feature.remove();
  res.status(StatusCodes.OK).json({ msg: "Success! Feature removed" });
};

const showProjectFeatureStats = async (req, res) => {

   const {project_id} = req.query;

  let stats = await Feature.aggregate([
    {
      $match: {
        $and: [
         // { createdBy: mongoose.Types.ObjectId(req.user.userId) },
          { project: mongoose.Types.ObjectId(project_id) },
        ],
      },
    },
    { $group: { _id: "$status", count: { $sum: 1 } } },
  ]);

  stats = stats.reduce((acc, curr) => {
    const { _id: title, count } = curr;
    acc[title] = count;
    return acc;
  }, {});
   const defaultStats = {
     inprogress: stats["In Progress"] || 0,
     onhold: stats["Finished"] || 0,
     finished: stats["On Hold"] || 0,
   };
  let monthlyApplications = await Feature.aggregate([
    { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
    {
      $group: {
        _id: {
          year: { $year: "$createdAt" },
          month: { $month: "$createdAt" },
        },
        count: { $sum: 1 },
      },
    },
    { $sort: { "_id.year": -1, "_id.month": -1 } },
    { $limit: 12 },
  ]);

  monthlyApplications = monthlyApplications
    .map((item) => {
      const {
        _id: { year, month },
        count,
      } = item;
      const date = moment()
        .month(month - 1)
        .year(year)
        .format("MMM Y");
      return { date, count };
    })
    .reverse();

  res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications });
};

module.exports = {
  createProject,
  deleteProject,
  getAllProjects,
  updateProject,
  showProjectStats,
  getAllProjectFeatures,
  createProjectFeature,
  updateProjectFeature,
  deleteProjectFeature,
  showProjectFeatureStats
};