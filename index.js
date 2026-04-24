require('dotenv').config();
const express = require("express")
const app = express()

app.use(express.json())

const userRoutes = require("./server/routes/user")
app.use("/users", userRoutes)

const reviewRoutes = require("./server/routes/review")
app.use("/reviews", reviewRoutes)


const PORT = process.env.PORT || 3000

app.listen(PORT, () => console.log(`Server listening on port ${PORT}!!`))