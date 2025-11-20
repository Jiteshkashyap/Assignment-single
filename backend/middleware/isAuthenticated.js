import jwt from "jsonwebtoken"


export const isAuthenticated = async (req, res, next) =>{
    try {
        const token = req.headers.authorization
        
        if(!token ){
            return res.status(401).json({
                success:false,
                message:"Access token missing"
            })
        }
         

        const decode =  jwt.verify(token, process.env.ACCESS_SECRET)
    
        req.id = decode.userId;
        
        next();

    } catch (error) {
            return   res.status(401).json({
                success:false,
                message:"Invalid token"
               })        
    }
}