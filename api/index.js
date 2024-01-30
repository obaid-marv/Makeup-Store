import express from "express";
import authRoute from "./routes/auth.js";
import mongoose from "mongoose";
import adminRoute from "./routes/admin.js"
import productRoute from "./routes/product.js"
import orderRoute from "./routes/order.js"
import cartRoute from "./routes/cart.js"
import cookieparser from "cookie-parser"
import dotenv from "dotenv";


const app = express();

dotenv.config();

const PORT = process.env.PORT || 4000;




const connectdb = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO)
        console.log("db connected");
    }
    catch(err){
        console.log(err);
    }

} 
 
app.use(cookieparser());
app.use(express.json());



app.get("/",(req,res)=>{
    res.json("first response");
})

// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
//     res.header('Access-Control-Allow-Credentials', true);
//     res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//     res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
//     if (req.method === 'OPTIONS') {
//       res.sendStatus(200);
//     } else {
//       next();
//     }
//   });

app.use("/api/auth",authRoute);
app.use("/api/product",productRoute);
app.use("/api/order",orderRoute);
app.use("/api/admin",adminRoute);
app.use("/api/cart",cartRoute)


app.listen(PORT,()=>{
    console.log("port is 4000");
    connectdb();
})


if (process.env.NODE_ENV == "production"){
    app.use(express.static("frontend/build"))
}