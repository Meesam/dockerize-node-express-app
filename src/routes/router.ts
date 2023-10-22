import express, {Request, Response} from "express";
import {IUsers} from "../models/IUsers";
import {createUser, getUserById, getUsers, updateUser} from "../services/userService";

const router = express.Router();
router.get('/', (req:Request, res:Response)=>{
    res.send("Hello, this is express using typescript with mongoose updated")
})

router.post('/user', async (req:Request, res:Response ) =>{
    const user: IUsers = {
        userName: req.body.userName,
        name:req.body.name,
        email:req.body.email,
        password:req.body.password
    }
    try {
        const userResponse = await createUser(user)
        res.status(200)
        res.json(userResponse)
    } catch (e) {
        res.status(500)
        res.send(e)
    }
})

router.get('/users', async(req:Request,res:Response)=>{
    try {
        const users = await getUsers()
        res.status(200)
        res.json(users)
    } catch (e) {
        res.status(500)
        res.send(e)
    }
})

router.get('/user/:id', async(req:Request, res: Response)=>{
    try {
        const id = req.params.id
        const user = await getUserById(id)
        res.status(200)
        res.json(user);
    } catch (e) {
        res.status(500)
        res.send(e)
    }
})

router.put('/user', async(req:Request, res:Response)=>{
       const user: IUsers = {
           _id:req.body.id,
           userName: req.body.userName,
           name:req.body.name,
           email:req.body.email,
           password:req.body.password
       }
    try {
        const userResponse = await updateUser(user)
        res.status(200)
        res.json(userResponse)
    } catch (e) {
        res.status(500)
        res.send(e)
    }
    
    
   
})

export default router