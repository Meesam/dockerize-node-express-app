import express from "express"
import userRouter from "./userRoutes";
import empRouter from "./empRoutes";

const appRoutes = express.Router();
appRoutes.use("/api/users", userRouter)
appRoutes.use("/api/employees", empRouter)


export default appRoutes