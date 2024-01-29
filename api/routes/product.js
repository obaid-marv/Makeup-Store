import express from "express";
import { addproduct, addtocart, allproduct, editproduct } from "../controllers/product.js";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

router.get("/", allproduct);

router.post("/add", addproduct);

router.patch("/edit/:id", editproduct);

router.post("/addtocart/:pid",verifyUser, addtocart);


export default router