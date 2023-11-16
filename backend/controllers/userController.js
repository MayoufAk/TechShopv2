import asyncHandler from "../middleware/asyncHandler.js"
import User from "../models/userModel.js"
import generateToken from "../utils/genereteToken.js"

//@desc Auth user and get the token 
//@route POST/api/users/login
//access Public 


const authUser =asyncHandler(async (req,res)=>{
   const {email,password}= req.body
   const user =await User.findOne({email})

   if(user&&( await user.matchPassword(password))){
    //jwt has a method called sign to generate a token 
    //-and its gonna be an object with paylaod- and the secret
    //and we dont wanna put it in your file but env varriable
    //this moved to utlis 
       generateToken(res,user._id)
   
       res.status(200).json({
        _id:user._id,
        name:user.name,
        email:user.email,
        isAdmin:user.isAdmin
        //In some cases we could send it back as json and store it back in frontend in local storage
        //but better way is set it as a cookie in server 
       })
   }else{
    res.status(401)
    throw new Error("Invalid email or Password")
   }
   })

//@desc Register user
//@route POST/api/users
//access Public 
const registerUser =asyncHandler(async (req,res)=>{
  const {name,email,password}=req.body
  const userExists=await User.findOne({email})
  if(userExists){
    res.status(400)
    throw new Error("User already exists")
  }
  const user=await User.create({
    name,
    email,
    password
  })
  if(user){
    generateToken(res,user._id)
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email:user.email,
      isAdmin:user.isAdmin,
    })
  }else{
    res.status(400)
    throw new Error("Invalid user data")
  }
   })

//@desc Logout user /clear the cookie --because we gonna store JSON web token in
// --http only cookie on the server and we need to destory that  
//@route POST/api/users/logout
//access Private 
const logoutUser =asyncHandler(async (req,res)=>{
  //this how to clear the cookie 
    res.cookie("Jwt","",{
     httpOnly:true,
     expires:new Date(0)
    })
    res.status(200).json({message:"Logged out successfully"})
   })

//@desc Get user profile
//@route GET/api/users/profile
//access Private 
const getUserProfile =asyncHandler(async (req,res)=>{
  const user=await User.findById(req.user._id)
  if(user){
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email:user.email,
      isAdmin:user.isAdmin,
    })
  }else{
    res.status(404)
    throw new Error("User not found")
  }
  })   

//@desc Update user profile
//@route PUT/api/users/profile--we are not passing an id because we 
//--using a token to get access to their own data and that will be encoded in json web token 
//access Private 
const updateUserProfile =asyncHandler(async (req,res)=>{
  const user=await User.findById(req.user._id)
  if(user){
   user.name=req.body.name || user.name //we use the user that in body name or we use the one in the database
   user.email=req.body.email|| user.email
   if (req.body.password){ // we do it this way because the password is hashed 
    user.password=req.body.password
   }
   const updateUSer=await user.save()
  
    res.status(200).json({
      _id: updateUSer._id,
      name: updateUSer.name,
      email:updateUSer.email,
      isAdmin:updateUSer.isAdmin,
    })
  }else{
       res.status(404)
       throw new Error("User not found")
  }
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