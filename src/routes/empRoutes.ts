import express from "express";
import {getAllEmployee} from "../controllers/empContoller";

const empRouter = express.Router();

empRouter.get('/', getAllEmployee)

export default empRouter