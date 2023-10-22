import {NextFunction, Request, Response} from "express";
import {createLogs} from "./logger"

export const errorhandler = (err:Error,req:Request, res:Response,next:NextFunction)=>{
    createLogs(`${err.name}: ${err.message}`,'errLog.txt')
    res.status(500).send(err.message)
}