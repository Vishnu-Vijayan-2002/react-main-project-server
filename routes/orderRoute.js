import express from 'express'
import authMiddleware from '../middileware/auth.js'
import { placeOrder, verifyOder,userOrders, listOrder, updateStatus } from '../controllers/orderController.js'


const orderRouter =express.Router();


orderRouter.post("/place",authMiddleware,placeOrder);

orderRouter.post("/verify",verifyOder)
orderRouter.post("/userorders",authMiddleware,userOrders)
orderRouter.get("/list",listOrder)
orderRouter.post("/status",updateStatus)
export default orderRouter;
