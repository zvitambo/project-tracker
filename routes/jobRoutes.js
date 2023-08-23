const express = require("express");
const {
  createJob,
  deleteJob,
  getAllJobs,
  updateJob,
  showStats,
} = require("../controllers/jobsController");
const router = express.Router();

router.route("/").get(getAllJobs).post(createJob);
router.route("/stats").get(showStats);
router.route("/:id").delete(deleteJob).patch(updateJob);

module.exports = router;
