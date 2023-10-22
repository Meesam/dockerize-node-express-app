import express, {NextFunction, Request, Response} from "express"
import mongoose from "mongoose";
import cors from "cors"
import {logRequestEvent} from "./middleware/logger"
import {errorhandler} from "./middleware/errorhandler";
import router from "./routes/router";

const app = express()
const port = process.env.PORT || 4000

const MONGODB_URL= "mongodb+srv://appuser:U33TgJdecX0yYQrj@cluster0.gudu8y5.mongodb.net/user_management?retryWrites=true&w=majority"

//custom middleware logger
app.use(logRequestEvent)

//Cross-origin Resource sharing
//const whitelistUrls = ["http://127.0.0.1:5500", "http://localhost:4000","https://universal-shuttle-910252.postman.co/workspace/Team-Workspace~690b4784-b180-49f6-8ab2-798c601f1477/request/create?requestId=01936717-c53d-498d-abd9-816a5f17a112"]
/*const corsOptions:cors.CorsOptions = {
    origin:(origin:any, callback:Function) =>{
       console.log('origin ', origin)
        if(whitelistUrls.indexOf(origin) !== -1){
           callback(null, true)
       }else {
           callback(new Error("Blocked by cors"))
       }
    },
    optionsSuccessStatus:200
}*/
app.use(cors())

// built in middleware
app.use(express.urlencoded({extended: false}))
app.use(express.json())

//route
app.use(router)
const connectMongoDb = async () =>{
    try {
        await mongoose.connect(process.env.MONGODB_URL || MONGODB_URL )
    }catch (err){
        console.log("Error on mongoose connection ", err)
    }
}

app.all('*',(req:Request, res:Response) =>{
    res.status(404)
    if(req.accepts('json')){
        res.json({err: "404 not found"})
    }else {
        res.type('txt').send("404 Not found")
    }
})

app.use(errorhandler)

app.listen(port,()=> {
    console.log(`Server running at http://localhost:${port}`);
    connectMongoDb()
        .then(res => console.log("Successfully connected to mongodb"))
})

