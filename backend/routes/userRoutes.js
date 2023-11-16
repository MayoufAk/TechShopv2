//Connect control functions to user Routes 

import express from "express"
const router= express.Router()
 
import { authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    getUserByID,
    deleteUser,
    updateUser} from "../controllers/userController.js"
import { protect,admin } from "../middleware/authMiddleware.js"

router.route("/").post(registerUser).get(protect,admin,getUsers) //ultimately thats gonna be an admin function and admin route
//-->so we gonna have to add a middleware to make it only admin can get users
router.post("/logout",logoutUser)
router.post("/auth",authUser)
router.route("/profile").get(protect,getUserProfile).put(protect,updateUserProfile)
router.route("/:id").delete(protect,admin,deleteUser).get(protect,admin,getUserByID).put
(protect,admin,updateUser)


export default router