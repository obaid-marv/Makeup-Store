import { Link, useNavigate } from "react-router-dom";
import "./header.css"
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/authActions";
import axios from "axios";
import { API_BASE_URL } from "../../config/api";


const Header = ()=>{

    const isLoggedIn = useSelector((state)=>state.auth.isLoggedIn);
    const username = useSelector((state)=>state.auth.username);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async ()=>{
        try{
        await axios.get(`${API_BASE_URL}/auth/logout`,{withCredentials:true});
        dispatch(logout());
        navigate("/login");
        }
        catch(err){
            console.log(err)
            dispatch(logout());
            navigate("/login");
        }
    }

    


    return(

        <div className="headerContainer">

            <div className="headerText">
                <h1>Makeup-Store</h1>   
            </div>
            {
            isLoggedIn?
            (
                <>
                <p style={{color:"white"}}>Hello {username}</p>
                <button className="headerButton" onClick={()=>handleLogout()}>Logout</button>
                </>
            )
            :
            (
                <div className="buttonContainer">
                    <button className="headerButton" ><Link to="/login">LOG IN</Link></button>
                    <button className="headerButton"><Link to="/signup">Sign Up</Link></button>
                </div>      
            )
            }
        </div>
    )
}

export default Header;