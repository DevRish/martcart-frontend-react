import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { IGlobalState } from '../../types/coreTypes';
import { connect } from 'react-redux';

interface INavbarProps {
    // Global State props
    isLoggedIn: boolean,
    cartItemCount: number,
    firstname: string,
    lastname: string,
}

const Navbar = ({ isLoggedIn, cartItemCount, firstname, lastname } : INavbarProps) => {

    const [showMenu, setshowMenu] = useState(false);
    const getInitials = () => {
        let init: string = "";
        if(firstname !== "") init += firstname[0];
        if(lastname !== "") init += lastname[0];
        init = init.trim();
        if(init === "") init = "Profile";
        return init;
    }

    return (
        <nav>
            <div className="navContainer">
                <h1><i className="fas fa-shopping-cart"></i>  MartCart</h1>
                <ul className={showMenu ? "show" : "hide"}>
                    <li><button className="closeMenu" onClick={() => setshowMenu(false)}><i className="fas fa-arrow-right"></i></button></li>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/myorders">My Orders</Link></li>
                    <li>
                        {
                            (isLoggedIn) ? 
                            <Link to="/profile">{getInitials()}</Link> :
                            <Link to="/authpage">SignIn</Link>
                        } 
                    </li>
                    <li><Link to="/search">Search <i className="fa-solid fa-magnifying-glass"></i></Link></li>
                    <li style={{ border: "none"}}>
                        <Link to="/cart" className="cartlogo">
                            <div style={{
                                position: "absolute",
                                top: "-1rem",
                                right: "-1rem",
                                backgroundColor: "#E27856",
                                color: "white",
                                borderRadius: "50%",
                                height: "2.5rem",
                                width: "2.5rem",
                                display: "grid",
                                placeItems:"center"
                        }}>
                            <p style={{ fontSize: "1.5rem" }}>{cartItemCount}</p></div>
                            <i className="fas fa-shopping-cart"></i>
                        </Link>
                    </li>
                </ul>
                <button className="burger" onClick={() => setshowMenu(true)}><i className="fas fa-bars"></i></button>
            </div>
        </nav>
    )
};

const mapStateToProps = function(state: IGlobalState) {
  return {
    isLoggedIn: state.auth.isLoggedIn,
    cartItemCount: state.cart.total,
    firstname: (state.auth.user) ? state.auth.user.firstname : "",
    lastname: (state.auth.user) ? state.auth.user.lastname : "",
  }
}

const NavbarWrapped = connect(mapStateToProps)(Navbar);

export default NavbarWrapped;
