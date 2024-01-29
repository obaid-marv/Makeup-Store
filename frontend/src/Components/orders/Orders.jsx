import { useSelector } from "react-redux";
import "./orders.css";
import { useEffect, useState } from "react";
import axios from "axios";


const Orders = () => {

    const isLoggedIn = useSelector((state)=>state.auth.isLoggedIn);
    const [orders,setOrders] = useState([]);


    useEffect(()=>{

        const fetchData = async () =>{
            try{
                const response = await axios.get("http://localhost:4000/api/order/userOrders",{withCredentials:true});
                setOrders(response.data);
            }
            catch(err){
                console.error(err);
            }
        }

        fetchData();

    },[]);



    return(
        <div className="mainContainer">
            <h2>ORDERS:</h2>

            {isLoggedIn? orders?.map((e,i)=>{
                return(
                    <div className="order" key={i}>
                        <h3>Details</h3>
                        <p>{e.products.map((ee)=>"1x"+ee.name+",")}</p>
                        <h3>Total : {e.price} Rs.</h3>
                        <p>Dated : {e.date}</p>
                    </div>
                )
            }):
            <>
            <h2>Please Log In</h2>
            </>
                
            }   
        </div>
    )
}

export default Orders;