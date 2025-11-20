import { UserModel } from "../models/userModel.js"
import bcrypt from "bcryptjs"



export const getMe = async (req, res) => {
  try {

    const userId= req.id
    const loggedInUser = await UserModel.findById(userId).select("-password");

    return res.status(200).json({
      success: true,
      user: loggedInUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch user",
    });
  }
}

export const updateUser = async (req, res) => {
  try {
    const userId = req.id;
    const { name, email, password } = req.body;

    const updatedData = {};

    if (name) updatedData.name = name;
    if (email) updatedData.email = email;
    
 
    if (password) {
      if(password.length <6){
        return res.status(400).json({
            success:false,
            message:"Password must be more than 6 characters"
        })
      }
      updatedData.password=await bcrypt.hash(password,10)
    }

    const updatedUser=await UserModel.findByIdAndUpdate(userId ,updatedData,{new:true}).select("-password")

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to update profile",
    });
  }
};

export const logout = async (_, res) => {
  try {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      sameSite: "strict",
    });

    return res.status(200).json({
      success: true,
      message: "Logout Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server error while logging out",
    });
  }
};