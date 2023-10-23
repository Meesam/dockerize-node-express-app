import {IUsers} from "../models/IUsers";
import UserModel from "../models/UserModel";

export const createUser = async (user:IUsers)=>{
	const {userName, name, email, password} = user;
	try {
		const userInput = new UserModel({
			name,
			email,
			password,
			userName,
			isVerify:false
		})
		return await userInput.save()
	}catch (e: any) {
		return {
			error:true,
			message:e.message
		}
	}
}

export const getUsers = async() =>{
	try {
		return await UserModel.find();
	}catch (e:any){
		return {
			error:true,
			message:e.message
		}
	}
}

export const getUserById = async(id:string) =>{
	try {
		return await UserModel.findOne({ _id: id } );
	}catch (e: any) {
		return {
			error:true,
			message:e.message
		}
	}
}

export const updateUser = async(user:IUsers)=>{
	try {
		return  UserModel.findByIdAndUpdate(
			user._id,
			{
				$set: {
					name: user.name,
					userName: user.userName,
					email: user.email,
					password: user.password
				}
			},
			{new:true}
			);
	}catch (e:any) {
		return {
			error:true,
			message:e.message
		}
	}
}
