import product from "../models/product.js";

import shoppingCart from "../models/shoppingCart.js";
import user from "../models/user.js";

import { createError } from "../utils/error.js";

export const allproduct = async (req,res)=>{
    await product.find().then((result)=>{
        res.json(result);
    })
    .catch(err=>{
        res.json(err);
    })
}

export const addproduct = async (req,res)=>{
    await product.create(req.body).then((result)=>{
        res.json(result);
    })
    .catch(err=>{
        res.json(err);
    })
}

export const editproduct = async (req,res)=>{
    product.findByIdAndUpdate(req.params.id,req.body,{new:true}).then((result)=>{
        res.status(200).json(result);
    })
    .catch(err=>{
        res.send(createError(500,"could not edit"));
    })
}


export const addtocart = async (req,res)=>{
    
    const data = await user.findById(req.user.id)
    const cart = data.cart;
    const {price,...others} = await product.findById(req.params.pid);
    shoppingCart.findByIdAndUpdate(cart,{$push: {products:req.params.pid},$inc:{price:price}},{new:true})
    .then(result=>res.json(result))
    .catch(err=>{
        res.send(createError(500,"couldn't add product to cart"));
    })
    
}
