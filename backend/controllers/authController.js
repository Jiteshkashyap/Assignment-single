import { UserModel } from "../models/userModel.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { generateAccessToken,generateRefreshToken } from "../utils/tokenService.js"



export const register=async (req,res)=>{

    try{
      const {name , email , password , gender ,age}=req.body;
      if( !name || !email || !password || !gender ||!age){
        return(
            res.status(400).json({
                success:false,
                message:"All fields are required"

            })
        )
      }
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      
      if(!emailRegex.test(email)){
        return res.status(400).json({
            success:false,
            message:"Invalid Email"
        })
      }
      if(password.length<6){
        return res.status(400).json({
            success:false,
            message:"Password must be more than 6 characters"
        })
      }
      const existingUser= await UserModel.findOne({email:email});
      if(existingUser){
        return res.status(400).json({
                success:false,
                message:"Email already registered"
            })
        
      }
      const hashPassword = await bcrypt.hash(password,10)
      const userDetails =await UserModel.create({
        name,
        email ,
        password : hashPassword,
        gender,
        age,
        role:"user"
      })
      return res.status(201).json({
            success:true,
            message:"Account Created Succesfully",
            userDetails
        })
      
    }
    catch (error){
        console.log(error)
        return res.status(500).json({
                success:false,
                message:"Failed to register"
            })
        

    }

}

export const  login =async(req,res)=>{
    try{
    const {email ,password} =req.body
    if(!email || !password){
      return(
        res.status(400).json({
          success:false,
          message:"All fields are required"
        })
      )
    }
       let existingUser = await UserModel.findOne({email});
       if(!existingUser){
        return(
          res.status(404).json({
            success:false,
            message:"Incorrect email or password"
          })
        )
      }

      let correctPassword = await bcrypt.compare(password ,existingUser.password)
      if(!correctPassword){
        return(
          res.status(400).json({
            success:false,
            message:"Incorrect credentials",
          })
        )
      }

      const accessToken = generateAccessToken({ userId: existingUser._id , role:existingUser.role });
      const refreshToken = generateRefreshToken({ userId: existingUser._id });
      
      return(res.status(200).cookie("refreshToken", refreshToken, {maxAge:7*24*60*60*1000, httpOnly:true , sameSite:"strict"}).json({
        success:true,
        message:`Welcome Back ${existingUser.name}`,
        user: existingUser,
        accessToken
      }))
    
  }
  catch(error){
    console.log(error)
    return(
      res.status(500).json({
        success:false,
        message:"Failed to login"
      })
    )
  }
}

export const refreshToken = async (req, res) => {


  try {
    const token = req.cookies.refreshToken;

    if (!token)
      return res.status(401).json({
        success: false,
        message: "Refresh token missing",
      });

    const decoded = jwt.verify(token, process.env.REFRESH_SECRET);

    if (!decoded)
      return res.status(401).json({
        success: false,
        message: "Invalid refresh token",
      });

    const newAccessToken = generateAccessToken({ id: decoded.id });

    return res.status(200).json({
      success: true,
      accessToken: newAccessToken,
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired refresh token",
    });
  }
}





