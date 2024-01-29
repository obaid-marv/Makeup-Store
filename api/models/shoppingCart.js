import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    
    products:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product'
        }
    ],  
    price:{
        type: Number,
        default: 0
    }
    

});

export default mongoose.model("cart",cartSchema);