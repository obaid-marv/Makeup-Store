import { Link } from "react-router-dom";
import "./navbar.css"

const Navbar = ()=>{
    return(
        <div className="navContainer">
            <button className="navButtons"><Link to='/home'>HOME</Link></button>
            <button className="navButtons"><Link to='/orders'>ORDER</Link></button>
            <button className="navButtons"><Link to='/cart'>CART</Link></button>
            <button className="navButtons">Help</button>

        </div>
    )
}

export default Navbar;