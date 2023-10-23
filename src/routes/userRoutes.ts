import express from "express";

import {createNewUser, getAllUsers, getSingleUserById, updateExistingUser} from "../controllers/userController";

const userRouter = express.Router();


// handle create user route
userRouter.post('/', createNewUser)

// handle get all users route
userRouter.get('/', getAllUsers)

// handle get user by id route
userRouter.get('/:id', getSingleUserById)


// handle update user route
userRouter.put('/', updateExistingUser)

export default userRouter