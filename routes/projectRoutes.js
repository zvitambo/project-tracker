const express = require("express");
const {
  createProject,
  deleteProject,
  getAllProjects,
  updateProject,
  showProjectStats,
  getAllProjectFeatures,
  createProjectFeature,
  updateProjectFeature,
  deleteProjectFeature,
  showProjectFeatureStats,
} = require("../controllers/projectsController");
const router = express.Router();


//projects 
router.route("/").get(getAllProjects).post(createProject);
router.route("/stats").get(showProjectStats);

//features
router
  .route("/features")
  .get(getAllProjectFeatures);
router.route("/features/:project_id").post(createProjectFeature);
router.route("/features/stats").get(showProjectFeatureStats);
router
  .route("/features/:id")
  .delete(deleteProjectFeature)
  .patch(updateProjectFeature);


//projects 
router.route("/:id").delete(deleteProject).patch(updateProject);





module.exports = router;
