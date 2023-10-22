import {NextFunction, Request, Response} from "express"
import path from "path"
import moment from "moment";
import {randomUUID} from "crypto";
import * as fs from "fs";
import fsPromises  from "fs/promises"

export const logRequestEvent = (req:Request, resp:Response, next:NextFunction) => {
    const msg = `${req.method}\n${req.headers.origin}\t${req.url}`
    createLogs(msg,'requestLogs.txt')
    next()
}

export const createLogs = async (message:string, logName:string) =>{
     const dateTime = moment(new Date()).format("DD/MMM/yyyy HH:MM:ss")
     const logItem = `${dateTime}\t${randomUUID()}\t${message}\n`
    try {
        if(!fs.existsSync(path.join(__dirname,'..', 'logs'))){
            await fsPromises.mkdir(path.join(__dirname,'..', 'logs'))
        }
        await fsPromises.appendFile(path.join(__dirname,'..', 'logs', logName),logItem)
    } catch (err:any) {
        console.error(err.message);
    }
}