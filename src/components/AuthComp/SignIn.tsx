import {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { authLogIn } from '../../api/auth';
import './AuthComp.css'
import { connect } from 'react-redux';
import { loginAction } from '../../reducers/auth/authActions';
import { getCart } from '../../api/cart';
import { getOrders } from '../../api/order';
import { setCartAction } from '../../reducers/cart/cartActions';
import { setOrdersAction } from '../../reducers/order/orderActions';

interface ISignInProps {
    // Global State props
    loginDispatch: Function,
    setCartDispatch: Function,
    setOrdersDispatch: Function,
    // Local State props
    setnavIndex: Function,
};

const SignIn = ({ setnavIndex, loginDispatch, setCartDispatch, setOrdersDispatch } : ISignInProps) => {

    useEffect(() => {
        window.scrollTo(0,0);
    }, [])

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [failmsg, setFailMsg] = useState('');
    const navigate = useNavigate();

    const handleLogIn = async () => { 
       if((username==='')||(password==='')) setFailMsg('Please fill all the fields');
       else {
            const credentials = {
                username: username,
                password: password
            };
            const authRet = await authLogIn(credentials);
            if(authRet.isSuccess && authRet.user) {
                const cartRet = await getCart();
                const ordersRet = await getOrders();

                if(!cartRet.isSuccess) console.log("Error while getting cart: ", cartRet.error);
                if(!ordersRet.isSuccess) console.log("Error while getting cart: ", ordersRet.error);
                // for now just displaying errors on console...
                // the frontend app won't break, because epty arrays are returned on error, so no actual error is thrown

                loginDispatch({
                    firstname: authRet.user.firstname,
                    lastname: authRet.user.lastname,
                });
                
                setCartDispatch(cartRet.cart);
                setOrdersDispatch(ordersRet.orders);

                navigate('/');
            }
            else {
                setFailMsg(authRet.error ? authRet.error : "");
            }
       }
    }

    return (
        <div className="authcomp">
            <h1 className='authTitle'>Welcome back!</h1>
            <label htmlFor="username_signin">Username</label>
            <input type="text" id="username_signin" onChange={(e) => { setUsername(e.target.value) }} required />
            <label htmlFor="password_signin">Password</label>
            <input type="password" id="password_signin" onChange={(e) => { setPassword(e.target.value) }} required />
            {
                (failmsg !== '') && <p style={{ color: 'red', fontSize: '1.5rem', marginBottom: '1rem' }}>{failmsg}</p>
            }
            <button className="authbtn" onClick={ handleLogIn }>LogIn</button>
            <div className='authToggle'>
                <p style={{ marginRight: "1rem" }}>Don't have an account?</p>
                <p style={{ cursor: "pointer", color:"#230033" }} onClick={ () => { setnavIndex(2) } }><b> SignUp </b></p>
            </div>
        </div>
    )
}

const mapDispatchToProps = {
  loginDispatch: loginAction,
  setCartDispatch: setCartAction,
  setOrdersDispatch: setOrdersAction,
}

export default connect(null, mapDispatchToProps)(SignIn);