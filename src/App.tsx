import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar'
import Home from './pages/HomePage/Home'
import CategoryPage from './pages/CategoryPage/CategoryPage'
import Product from './pages/ProductPage/Product'
import MyOrders from './pages/OrdersPage/MyOrders'
import AuthPage from './pages/AuthPage/AuthPage'
import Profile from './pages/ProfilePage/Profile'
import Cart from './pages/CartPage/Cart'
import Footer from './components/Footer/Footer'
import { connect } from 'react-redux';
import { loginAction } from './reducers/auth/authActions';
import { setCartAction } from './reducers/cart/cartActions';
import { setOrdersAction } from './reducers/order/orderActions';
import CryptoJS from "crypto-js";
import Cookies from 'universal-cookie';

import './App.css';
import axiosClient from './config/axiosClient';
import { getUserData } from './api/user';
import { getCart } from './api/cart';
import { getOrders } from './api/order';
import { useEffect, useState } from 'react';
import Spinner from './components/Spinner/Spinner';

interface IAppProps {
    // Global State props
    loginDispatch: (...args: any[]) => void,
    setCartDispatch: (...args: any[]) => void,
    setOrdersDispatch: (...args: any[]) => void,
}

const App = ({ loginDispatch, setCartDispatch, setOrdersDispatch } : IAppProps) => {
    const [isLoading, setIsLoading] = useState(false);

    const checkLoggedIn = async () => {
        const cookies = new Cookies();
        try {
            const authCipher = cookies.get("authCipher");
            if(authCipher && (authCipher !== "")) {
                console.log("found existing auth");
                const bytes  = CryptoJS.AES.decrypt(authCipher, "martcartSecret");
                const token = bytes.toString(CryptoJS.enc.Utf8);
                axiosClient.defaults.headers.common["Authorization"] = "Bearer " + token;
                const userFuncRet = await getUserData();
                
                if(!(userFuncRet.isSuccess && userFuncRet.user)) throw new Error("Error while fetching user data");

                const cartRet = await getCart();
                const ordersRet = await getOrders();

                if(!cartRet.isSuccess) throw new Error("Error while fetching cart");
                if(!ordersRet.isSuccess) throw new Error("Error while fetching order");

                loginDispatch({
                    firstname: userFuncRet.user.firstname,
                    lastname: userFuncRet.user.lastname,
                });
                
                setCartDispatch(cartRet.cart);
                setOrdersDispatch(ordersRet.orders);
            }
        } catch(error) {
            console.log(error);
            cookies.remove("authCipher");
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        setIsLoading(true);
        checkLoggedIn();
    }, []);

    return(
        (isLoading) ?
        <Spinner /> :
        <div style={{ minHeight: "100vh", position: "relative", paddingBottom: "8vh" }}>
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/search/" element={<CategoryPage />} />
                <Route path="/product/:id" element={<Product />} />
                <Route path="/myorders" element={<MyOrders />} />
                <Route path="/authpage" element={<AuthPage />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/profile" element={<Profile />} />
            </Routes>
            <Footer />
        </BrowserRouter>
        </div>
    );
}

const mapDispatchToProps = {
  loginDispatch: loginAction,
  setCartDispatch: setCartAction,
  setOrdersDispatch: setOrdersAction,
}

const AppWrapped = connect(null, mapDispatchToProps)(App);

export default AppWrapped;
