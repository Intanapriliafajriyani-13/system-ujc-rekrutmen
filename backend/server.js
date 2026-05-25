const express = require("express")
const cors = require("cors")
const applicantRoutes = require("./routes/applicantRoutes")

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/applicants", applicantRoutes)

const PORT =
  process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})