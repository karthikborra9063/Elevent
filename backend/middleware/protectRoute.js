import organizer from "../models/organizer_model";
import jwt from 'jsonwebtoken'
const protectRoute = async (req, res, next) =>{
    try{
        const token=req.cookies?.jwt;
        if(!token){
            return res.status(401).json({error:"No token provided"});
        }
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        if(!decoded){
            return res.status(401).json({error:"In valid token"});
        }
        const user = await organizer.findById(decoded.userId).select('-password');
        if(!user){
            return res.status(404).json({error:"User not found"});
        }
        req.user=user;
        next();
    }catch(err){
        console.log("Error occuered at protectRoute");
        return res.status(500).json({error:`Error occured at protectRoute: ${err.message}`});
    }
}
export default protectRoute;