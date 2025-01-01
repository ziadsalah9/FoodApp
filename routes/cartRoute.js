import express from "express"
import { addtocart, getAll, removefromcart } from "../controllers/cartcontroller.js";
import AuthMiddleware from "../middleware/Auth.js";

const cartRoutes = express.Router();

cartRoutes.get("/getAll", AuthMiddleware,getAll)
cartRoutes.post("/add",AuthMiddleware,addtocart)
cartRoutes.post("/remove",AuthMiddleware,removefromcart)

export default cartRoutes;