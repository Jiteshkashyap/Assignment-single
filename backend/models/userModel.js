import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    name:{type:String, required:true},
    email:{type:String , required:true , unique:true },
    password:{type:String , required:true},
    gender:{type:String , required:true},
    age:{type:Number , required:true},
    createdAt:{type:Date ,default:Date.now()},
    updatedAt:{type:Date ,default:Date.now()},
    role:{type:String , required:true, enum:["admin","user"]}
})

userSchema.pre("save", function(next){ this.updatedAt = Date.now(); next(); });
userSchema.pre("findOneAndUpdate", function(next){ this.set({ updatedAt: Date.now() }); next(); });

export const UserModel= mongoose.model("User",userSchema)