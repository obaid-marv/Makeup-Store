import Header from "../../Components/header/Header";
import "./signup.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { def, login } from "../../redux/authActions";
import { API_BASE_URL } from "../../config/api";

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [contact, setContact] = useState('');
    const [password, setPassword] = useState('');
    const isLoggedIn = useSelector((state)=>state.auth.isLoggedIn)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = axios.post(`${API_BASE_URL}/auth/register`,{
            name:name,
            password:password,
            email:email,
            contact:contact
        })

        result.then((res)=>{
            if(res.data){
                console.log(res)
                dispatch(login(res.data))
                navigate("/home");
            }
            else{
                console.log("some other error");
            }
            }
        )
        .catch(err=>console.error(err));

    };

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
                <h2>Signup</h2>
                <form onSubmit={handleSubmit}>
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
                        Email:
                        <input
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </label>
                    <br />
                    <label>
                        Contact:
                        <input
                            type="text"
                            value={contact}
                            onChange={(e) => setContact(e.target.value)}
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
                    <button type="submit">Signup</button>
                </form>
            </div>
        </div>
    );
};

export default Signup;
