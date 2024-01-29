import User from "../models/user.js";
import bcrypt from "bcrypt";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";
import shoppingCart from "../models/shoppingCart.js";


export const register = async(req,res,next)=>{
    try{
        
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        const newCart = await shoppingCart.create({products:[]});
        



        const newUser = new User({ 
            name:req.body.name,
            email:req.body.email,
            password:hash,
            cart: newCart,
            contact:req.body.contact,

        });

        const {name} = await newUser.save();
        
        res.status(200).json(name);
    }
    catch(err){
        next(err);
    }
}

export const login = async(req,res,next)=>{
    try{
        const user = await User.findOne({username: req.body.username});
        console.log(req.body)
        console.log("hello")
        console.log(user)
        if(!user) 
        return next(createError(404,"user not found"));
        
        const ispassword = await bcrypt.compare(req.body.password, user.password);



        if(!ispassword)
        return next(createError(400,"Incorrect user or password"));

        const { password,isAdmin,...otherdetails} = user._doc;
       
        const token = jwt.sign({id:user._id, isAdmin: user.isAdmin}, process.env.JWT);

        console.log(password)
        console.log(isAdmin)
        
        res.cookie("access_token",token,{
            httpOnly:true
        }).status(200).json({...otherdetails});
    }
    catch(err){
        next(err);
    }
}

export const logout = (req,res)=>{

    res.cookie("access_token","")
        .json("Logged Out Successfully")
    


}