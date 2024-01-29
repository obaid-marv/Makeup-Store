import express from "express";
import { verifyToken, verifyUser } from "../utils/verifyToken.js";
import {deleteFromCart, getCartProducts } from "../controllers/cart.js";

const router = express.Router();

router.get("/", verifyToken, getCartProducts);

router.get("/deleteProduct/:id",verifyToken, deleteFromCart);

export default router;