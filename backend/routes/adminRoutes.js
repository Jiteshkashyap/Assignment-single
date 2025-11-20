import express from "express"
import { isAuthenticated } from "../middleware/isAuthenticated.js"
import { isAdmin } from "../middleware/adminAuthenticated.js"
import { getAllUsers,getUserDetails,deleteUser,updateUserRole } from "../controllers/adminController.js"

const router =express.Router()

router.get("/getAllUsers",isAuthenticated,isAdmin,getAllUsers)
router.get("/users/:id",isAuthenticated,isAdmin,getUserDetails)
router.delete("/users/:id",isAuthenticated,isAdmin,deleteUser)
router.put("/users/:id/role",isAuthenticated,isAdmin,updateUserRole)

export default router