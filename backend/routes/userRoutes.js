import express from "express"
import {  logout, getMe, updateUser } from "../controllers/userController.js"
import { isAuthenticated } from "../middleware/isAuthenticated.js"

const router = express.Router()

router.get("/me",isAuthenticated,getMe)
router.put("/update",isAuthenticated,updateUser)
router.post("/logout",isAuthenticated,logout)

export default router