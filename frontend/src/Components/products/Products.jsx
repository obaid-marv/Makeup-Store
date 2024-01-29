import { useEffect, useState } from "react";
import "./products.css"
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const Products = ()=>{

    const [list,setList] = useState([]);
    const navigate = useNavigate();
    const isLoggedIn = useSelector((state)=>state.auth.isLoggedIn);
    useEffect(()=>{

        const res = axios.get("http://localhost:4000/api/product/");
        res.then((result)=>setList(result.data))


    },[])


    const handleAdd = async(id)=>{

        if(isLoggedIn){

        try{
            axios.post(`http://localhost:4000/api/product/addtocart/${id}`,
            {},
            {
                withCredentials:true
            })
            .then((res)=>{
                console.log(res.data)
            })

        }
        catch(error){
            console.log(error)
        }
        }
        else{
            navigate("/login");
        }   
    }



    return(
        <div>
            <h1>Products</h1>
            <div className="pContainer">
                
                {list?.map((e,i)=>{
                    return(
                        <div className="product" key={i}>
                            <img className="pimg" src={e.url} alt="Img Here" />
                            <p className="title">{e.name}</p>
                            <p className="price">Rs. {e.price}</p>
                            <button className="addCartButton" onClick={() =>handleAdd(e._id)}>
                            Add to Cart
                        </button>
                        </div>
                    )
                    })
                }   

            </div>
        </div>
    )
}

export default Products;