import {Request, Response} from "express";
import {getUsers} from "../services/userService";

export const getAllEmployee = async(req:Request, res:Response)=>{
	try {
		const users = await getUsers()
		res.status(200)
		res.json(users)
	} catch (e) {
		res.status(500)
		res.send(e)
	}
}