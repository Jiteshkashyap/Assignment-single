import express,{urlencoded} from "express"
import dotenv from "dotenv"
import dbConnect from "./config/db.js"
import authRoutes from "./routes/authRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import adminRoutes from"./routes/adminRoutes.js"
import cookieParser from "cookie-parser"
import { adminSeed } from "./config/adminSeed.js"

dotenv.config()
dbConnect().then(()=>{
    adminSeed()
})

const app =express()

//Midddleware
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended:true}))

//Routes
app.use("/api/auth",authRoutes)
app.use("/api/admin",adminRoutes)
app.use("/api/user",userRoutes)

const PORT =process.env.PORT || 7002
app.listen(PORT
    ,()=>{
        console.log(`Server is running at port ${PORT}`)
    })