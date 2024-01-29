import express from "express";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";
import { allOrders, deleteOrder, getUserOrders, placeOrder } from "../controllers/order.js";

const router = express.Router();

router.get("/", verifyAdmin, allOrders);

router.delete("/delete/:oid", verifyAdmin, deleteOrder);

router.post("/placeorder",verifyToken, placeOrder);

router.get("/userOrders",verifyToken,getUserOrders);

export default router