import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    products:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product'
        }
    ],  
    date:{
        type: Date,
        default: Date.now
    },
    verified:{
        type:Boolean,
        default : false
    },
    price:{
       type: Number,
       default : 0, 
    }

});

export default mongoose.model("order",orderSchema);