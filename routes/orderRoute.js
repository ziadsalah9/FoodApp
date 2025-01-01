import express from 'express'
import AuthMiddleware from "../middleware/Auth.js";
import { placeOrder, verfiyorder } from "../controllers/ordercontroller.js";


const orderRouter = express.Router();

orderRouter.post ("/place",AuthMiddleware,placeOrder);
orderRouter.post ("/verfiy",verfiyorder);

export default orderRouter; 