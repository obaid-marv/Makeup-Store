import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./cart.css"
import axios from "axios";
import { useSelector } from "react-redux";
import { API_BASE_URL } from "../../config/api";

const Cart = ()=>{

    const [list,setList] = useState([]);
    const [price,setPrice] = useState([]);
    const isLoggedIn = useSelector((state)=>state.auth.isLoggedIn);
    const navigate = useNavigate();
    


    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(`${API_BASE_URL}/cart/`, {
            withCredentials: true,
            validateStatus: (status) => {
              return status >= 200 && status < 500;
            },
          });
          
          const {price,products} = response.data;
          console.log(products);
          setList(products)
          setPrice(price);

        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
    
      fetchData();
    
    }, [list]);


    const handleDelete =async (id)=>{
      try{
        await axios.get(`${API_BASE_URL}/cart/deleteProduct/${id}`,
        {
            withCredentials:true
        })
        .then((res)=>{
            console.log(res.data)
            navigate('/cart');
        })

      }
      catch(error){
        console.log(error)
      }
    }


    const handleOrder = async ()=>{

      try{
        await axios.post("http://localhost:4000/api/order/placeorder",{},{
          withCredentials:true
        })
        console.log("order placed successfully!!..");

      }
      catch(err){

      }


    }

    return(
        <div>
            <h1>Cart Products</h1>
            <div className="pContainer">
                
                {isLoggedIn?
                <>
                {
                list?.map((e,i)=>{
                    return(
    
                    <div className="product" key={i}>
                        <img className="pimg" src={e.url} alt="Product Here" />
                        <p className="title">{e.name}</p>
                        <p className="price">{e.price}</p>
                        <div>
                        <button className="deleteButton" onClick={() => handleDelete(e._id)}>
                            Delete
                        </button>
                        </div>
                    </div>
                    
                    )
                    })
                }
                </>:
                <>
                    <div>
                        <h2>User Not Logged In!!</h2>
                    </div>
                </>
                }
                
            </div>
            <div className="priceContainer">
                  
                  <h3>
                    Total: {price} Rs
                  </h3>
                  {price!==0?<>
                    <button onClick={()=>handleOrder()}>Place Order</button>
                    </>:
                    <></>
                  }

            </div>
        </div>
    )
}

export default Cart;