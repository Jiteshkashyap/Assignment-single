import { UserModel } from "../models/userModel.js";
import { pagination } from "../utils/pagination.js";

export const getAllUsers=async(req,res)=>{

    try {
        const{page,limit,skip}= pagination({
            page:req.query.page,
            limit:req.query.limit
        })

        const users=await UserModel.find({}).select("_id name createdAt").skip(skip).limit(limit)
        const totalUsers=await UserModel.countDocuments()

        return res.status(200).json({
            success:true,
            currentPage:page,
            totalPages:Math.ceil(totalUsers/limit),
            totalUsers,
            users
        })
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Failed to fetch Users"
        })
    }
}

 export const getUserDetails = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false,
         message: "server error" });
  }
}  

  export const deleteUser = async (req, res) => {
    try {
     const user = await UserModel.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  }
   catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
}

  export const updateUserRole=async(req,res)=>{
    try {
        const{role}=req.body
        if(!role){
            return res.status(400).json({
                success:false,
                message:"Roleis required"
            })
        }

        const user =await UserModel.findByIdAndUpdate(req.params.id ,{role},{new:true})

        if(!user){
            return res.status(404).json({
                success:false,
                message:"user not found"
            })
        }
        return res.status(200).json({
            success:true,
            message:"user role updated successfully!",
            user
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message:"server error",
            success:false
        })
    }

  }