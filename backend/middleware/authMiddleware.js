import  jwt  from "jsonwebtoken";
import asyncHandler from "./asyncHandler.js";
import User from "../models/userModel.js";


//--WE have two fuctions in this file -Protect allow us to protect Routes for users are Registerd 
// --Admin middlware function for users are Admin ,in order to get all orders you have to be an admin


//Protect routes 
//In any middleware we could we any thing we want req,res 
//,just we have to add next to move to next middleware
 const protect =asyncHandler(async(req,res,next)=>{
 let token 
 //Read the jwt from the cookie 
  token =req.cookies.jwt
  if(token){
     try {
        const decoded=jwt.verify(token, process.env.JWT_SECRET)
        req.user=await User.findById(decoded.userId).select("-password")
        next()
     } catch (error) {
        console.log(error)
        res.status(401)
        throw new Error("Not authorized,token failed")
     }
  }else{
    res.status(401)
    throw new Error("Not authorized,no token")

  }
})

//Admin middleware 
const admin=(req,res,next)=>{
    if(req.user && req.user.isAdmin){
        next()
    }else{
        res.status(401)
        throw new Error("Not Authorized as Admin ")
    }
}

export {protect,admin}