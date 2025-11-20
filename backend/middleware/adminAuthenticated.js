import jwt from "jsonwebtoken"
import { UserModel } from "../models/userModel.js"

export const isAdmin=async(req,res,next)=>{

    try {
        const user =await UserModel.findById(req.id)

        if(!user){
            return res.status(404).json({
                success:false,
                message:"User not found"
            })
        }
        if(user.role !=="admin"){
            return res.status(403).json({
                success:false,
                message:"Unauthorized access"
            })
        }
        next()

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            status:false,
            message:"Server error"
        })
    }
}