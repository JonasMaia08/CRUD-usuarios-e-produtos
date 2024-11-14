import express from "express"
import userRoutes from "./routes/user.js"
import Register from "./routes/register.js"

import cors from "cors"

const app = express()

app.use(express.json())
app.use(cors())

app.use("/", userRoutes)
app.use("/user/", Register)

app.listen(8800)