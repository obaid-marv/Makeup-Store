import product from "../models/product.js";
import shoppingCart from "../models/shoppingCart.js";
import user from "../models/user.js";
import { createError } from "../utils/error.js";


export const getCartProducts = async(req,res)=>{

    try{
        const {cart} = await user.findById(req.user.id);
        const fetchedCart = await shoppingCart.findById(cart).populate("products");
        
        res.json(fetchedCart);
    }
    catch(error){
        res.json(error);
    }    
    
}

export const deleteFromCart = async (req, res) => {
    try {
        const userData = await user.findById(req.user.id);
        
        if (!userData) {
            return res.status(404).json(createError(404, "User not found"));
        }

        const cart = userData.cart;

        const productData = await product.findById(req.params.id);

        if (!productData) {
            return res.status(404).json(createError(404, "Product not found"));
        }

        const updatedCart = await shoppingCart.findByIdAndUpdate(
            cart,
            {
                $pull: { products: req.params.id },
                $inc: { price: -productData.price }
            },
            { new: true }
        ).populate('products');
        
        const totalPrice = updatedCart.products.reduce((sum, product) => sum + product.price, 0);
        
        const newupdatedCart = await shoppingCart.findByIdAndUpdate(
            cart,
            {
                price:totalPrice
            },
            {new:true}
        );

        res.json(newupdatedCart);


    } catch (err) {
        console.error(err);
        res.status(500).json(createError(500, "Couldn't delete product from cart"));
    }
};