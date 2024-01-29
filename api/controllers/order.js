import product from "../models/product.js";
import shoppingCart from "../models/shoppingCart.js";
import user from "../models/user.js";
import order from "../models/order.js";
import { createError } from "../utils/error.js";

export const allOrders = async (req,res)=>{
    order.find().
    then(result=>res.send(result))
    .catch(err=>
        createError(500,"can not get all orders")
    );
}

export const getUserOrders = async (req,res)=>{
    order.find({userId:req.user.id}).populate("products").
    then(result=>res.send(result))
    .catch(err=>
        createError(500,"can not get all orders")
    );
}

export const deleteOrder = async (req,res)=>{
    order.findByIdAndDelete(req.params.oid).
    then(result=>res.send(result))
    .catch(err=>{
        createError(500,"can not delete order");
    });
}

export const placeOrder = async (req,res)=>{
    
    const usercart = await user.findById(req.user.id);
    
    const id = usercart.cart
    const {products,price,...others} = await shoppingCart.findById(id);
    await shoppingCart.findByIdAndUpdate(id,{products:[],price:0})
    order.create({
        userId:req.user.id,
        products:products,
        price:price
    }).
    then(result=>{
        res.send(result);
    })
    .catch(err=>{
        createError(500,"couldnt place order");
    })
}


export const verifyOrder = async (req,res)=>{
    order.findByIdAndUpdate(req.params.oid,{verify:true},{new:true}).
    then(result=>res.send(result))
    .catch(err=>
        createError(500,"can not verify order")
    );
}
