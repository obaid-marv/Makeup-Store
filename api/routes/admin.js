import express from "express";
import { addproduct, editProduct } from "../controllers/admin.js"
import { verifyAdmin } from "../utils/verifyToken.js";
import { verifyOrder } from "../controllers/order.js";


const router = express.Router();

router.get("/", (req,res)=>{
    res.json("ADMIN ROUTE");
});

router.post('/addproduct',verifyAdmin, addproduct);


router.patch('/verifyOrder/:oid',verifyAdmin, verifyOrder)
export default router;
