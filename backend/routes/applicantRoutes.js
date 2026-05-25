const express = require("express")
const router = express.Router()
const {
  getApplicants,
  createApplicant,
  getApplicantById,
} = require("../controllers/applicantController")

router.get("/", getApplicants)
router.post("/", createApplicant)
router.get("/:id", getApplicantById)

module.exports = router