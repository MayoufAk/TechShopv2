import asyncHandler from "../middleware/asyncHandler.js"
import User from "../models/userModel.js"
import Jwt  from "jsonwebtoken"

//@desc Auth user and get the token 
//@route POST/api/users/login
//access Public 


const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
  
    const user = await User.findOne({ email})
  
    if (user&&(await user.matchPassword(password))) {
      console.log(password)
    //   generateToken(res, user._id);
  
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      });
    } else {
      res.status(401);
      throw new Error('Invalid email or password');
    }
  });
// const authUser =asyncHandler(async (req,res)=>{
//    const {email,password}= req.body
//    const user =await User.findOne({email})

//    if(user&&( await user.matchPassword(password))){
//     //jwt has a method called sign to generate a token 
//     //-and its gonna be an object with paylaod-
//     const token =Jwt.sign({userId:user._id},process.env.JWT_SECRET,{
//         expiresIn:"30d"
//     })
//     //Set JWT as HTTP-ONLY cookie 
//     res.cookie("jwt",token,{
//         httpOnly:true,
//         secure:process.env.NODE_ENV!=="development",
//         sameSite:"strict",
//         maxAge:30*24*60*60*1000 //30 Days
//     })
//        res.json({
//         _id:user._id,
//         name:user.name,
//         email:user.email,
//         isAdmin:user.isAdmin
//        })
//    }else{
//     res.status(401)
//     throw new Error("Invalid email or Password")
//    }
//    })

//@desc Register user
//@route POST/api/users
//access Public 
const registerUser =asyncHandler(async (req,res)=>{
    res.send("register user")
   })

//@desc Logout user /clear the cookie --because we gonna store JSON web token in
// --http only cookie on the server and we need to destory that  
//@route POST/api/users/logout
//access Private 
const logoutUser =asyncHandler(async (req,res)=>{
    res.send("logout user")
   })

//@desc Get user profile
//@route GET/api/users/profile
//access Private 
const getUserProfile =asyncHandler(async (req,res)=>{
    res.send("get user profile")
   })   

//@desc Update user profile
//@route PUT/api/users/profile--we are not passing an id because we 
//--using a token to get access to their own data and that will be encoded in json web token 
//access Private 
const updateUserProfile =asyncHandler(async (req,res)=>{
    res.send("update user profile")
   })    
//@desc Get users
//@route GET/api/users
//access Private/Admin
const getUsers =asyncHandler(async (req,res)=>{
    res.send("get users")
   }) 
//@desc Get user by ID 
//@route GET/api/users/:id
//access Private/Admin
const getUserByID =asyncHandler(async (req,res)=>{
    res.send("get user by id")
   }) 

//@desc Delete  user
//@route DELETE/api/users/:id
//access Private/Admin
const deleteUser =asyncHandler(async (req,res)=>{
    res.send("delete user")
   }) 
// this where the admin update any user
//@desc PUT  user
//@route DELETE/api/users/:id
//access Private/Admin
const updateUser =asyncHandler(async (req,res)=>{
    res.send("update user")
   }) 

export {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    getUserByID,
    deleteUser,
    updateUser,
}   