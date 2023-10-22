import mongoose from "mongoose";
import {IUsers} from "./IUsers";


const userSchema = new mongoose.Schema({
	_id:String,
	userName: {type:String, required:[true, "UserName is required"] , unique:true},
	name: {type:String, required: [true, "Name is required"]},
	email: {type:String, required:[true, "email is required"], unique: true},
	password:{type:String, required:[true, "password is required"]},
	isVerify: { type: Boolean }
})

const UserModel = mongoose.models.users ||  mongoose.model<IUsers>('User', userSchema)

export default  UserModel;