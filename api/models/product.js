import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    quantity:{
        type: Number,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        default : false
    },
    url:{
        type: String,
        required: true
    }

});

export default mongoose.model("product",productSchema);