import product from "../models/product.js"

export const addproduct = async (req,res)=>{
    await product.create(req.body.params).then((result)=>{
        res.json(result);
    })
    .catch(err=>res.json(err));

}

export const deleteproduct = async (req,res)=>{
    await product.findByIdAndDelete(req.params.id).then((result)=>{
        res.json(result);
    })
    .catch(err=>res.json(err));

}

export const editProduct = async (req,res)=>{
     await product.findByIdAndUpdate(req.params.id,req.body,{new:true}).then((result)=>{
        res.json(result);
    })
    .catch(err=>res.json(err));
}



