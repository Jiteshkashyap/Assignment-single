import bcrypt from "bcryptjs";
import { UserModel } from "../models/userModel.js";

export const adminSeed=async( req,res)=>{
    try {
        const adminEmail="admin@gmail.com"

        const existingAdmin = await UserModel.findOne({email:adminEmail})

        if(existingAdmin){
            console.log("Admin already seeded!")
            return
        }

        const hashPassword = await bcrypt.hash("admin123",10)

        await UserModel.create({
            name:"Admin",
            email:adminEmail,
            password:hashPassword,
            gender:"Male",
            age:25,
            role:"admin"
        })
        console.log("Admin seeded succesfully")
        
    } catch (error) {
        console.log(" error while admin seeding ",error)
    }

}