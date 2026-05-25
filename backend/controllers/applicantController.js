const fs = require("fs")
const path = require("path")
const { v4: uuidv4 } = require("uuid")

const filePath = path.join(__dirname, "../data/applicants.json")

const readData = () => {
  const data = fs.readFileSync(filePath)
  return JSON.parse(data)
}

const writeData = (data) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2))
}

const getApplicants = (req, res) => {
  const applicants = readData()
  res.json(applicants)
}

const getApplicantById = (req, res) => {
  const applicants = readData()

  const applicant = applicants.find((a) => a.id === req.params.id)

  if (!applicant) {
    return res.status(404).json({ message: "Data tidak ditemukan" })
  }

  res.json(applicant)
}

const createApplicant = (req, res) => {
  const applicants = readData()

  const newApplicant = {
    id: uuidv4(),
    createdAt: new Date(),
    ...req.body,
  }

  applicants.push(newApplicant)

  writeData(applicants)

  res.status(201).json(newApplicant)
}

module.exports = {
  getApplicants,
  createApplicant,
  getApplicantById,
}