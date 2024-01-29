import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../../Components/header/Header"
import { useNavigate } from "react-router-dom";
import "./login.css";
import { useDispatch, useSelector } from "react-redux";
import { def, login } from "../../redux/authActions";


const Login = () => {

    const isLoggedIn = useSelector((state)=>state.auth.isLoggedIn)
    const [name, setName] = useState('');
    
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(name, password)
        try{
            const res = await axios.post("http://localhost:4000/api/auth/login",{
                "name":name,
                "password":password
            },{
                withCredentials:true
            })

            if(res.data){

                dispatch(login(res.data.name));
                navigate("/home");
            }
            else{
                console.error("login failed")
            }
        }
        catch(error){
            console.log(error)
        }
    }

        
    useEffect(()=>{
        dispatch(def());
        if(isLoggedIn){
            navigate("/home");
        }
    },[isLoggedIn,dispatch,navigate])

    

    return (
        <div>
            <Header />
            <div className="login-container">
                <h2>Login</h2>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <label>
                        Name:
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </label>
                    <br />
                    <label>
                        Password:
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </label>
                    <br />
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    )
}

export default Login;