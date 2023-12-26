import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { stateList, cityList } from '../../utils/locationsList';
import { getUserData } from "../../api/user";
import { addNewOrder } from "../../api/order";
import { emptyCart } from "../../api/cart";
import Spinner from "../Spinner/Spinner";
import RazorPay from './../../assets/razorpay.svg';
import './Checkout.css';
import { ICartItem, IGlobalCartState, IGlobalState, IOrder, IUser } from "../../types/coreTypes";
import { connect } from "react-redux";
import { setCartAction } from "../../reducers/cart/cartActions";
import { addOrdersAction } from "../../reducers/order/orderActions";
import CryptoJS from "crypto-js";
import { RAZORPAY_KEY_SECRET } from "../../config/keys";
import { renderCheckoutConfig } from "../../utils/paymentUtils";
import { createRzpOrder } from "../../api/payment";

interface ICheckoutProps {
    // Global State props
    cart: ICartItem[],
    setCartDispatch: (newCart: IGlobalCartState) => void,
    addOrdersDispatch: (orders: IOrder[]) => void,
    // Local State props
    currItemId: string,
    price: number,
    isCart: boolean, // tells whether single item checkout or cart checkout
}

enum PaymentOptions {
    CASH_ON_DELIVERY="CASH_ON_DELIVERY",
    RAZORPAY="RAZORPAY"
}

const Checkout = ({ cart, currItemId, price, isCart, setCartDispatch, addOrdersDispatch } : ICheckoutProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [currUser, setCurrUser] = useState<IUser>();
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [pin, setPin] = useState('');
    const [payChosen, setPayChosen] = useState("");
    const [isEmpty, setIsEmpty] = useState(false);
    const navigate = useNavigate();

    const rzpOrderId = useRef("");

    useEffect(() => {
        setIsLoading(true);
        getCurrUserData();
    }, []);

    const getCurrUserData = async () => {
        try {
            const userFuncRet = await getUserData();
            if(userFuncRet.isSuccess && userFuncRet.user) {
                setCurrUser(userFuncRet.user);
            } else {
                throw new Error("Unable to fetch user data");
            }
        } catch(error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    const addOrder = async () => {
        if(isCart) {
            const newOrders: IOrder[] = [];
            for(const item of cart) {
                const orderFuncRet = await addNewOrder({
                    productId: String(item.productId._id),
                    quantity: item.quantity,
                    address: (address+', '+city+', '+state+' - '+pin),
                });
                if(orderFuncRet.order) newOrders.push(orderFuncRet.order);
            }
            await emptyCart();
            addOrdersDispatch(newOrders);
            setCartDispatch({
                items: [],
                total: 0,
            });
        } else {
            const orderFuncRet = await addNewOrder({
                productId: currItemId,
                quantity: 1,
                address: (address+', '+city+', '+state+' - '+pin),
            });
            if(orderFuncRet.order) {
                addOrdersDispatch([orderFuncRet.order]);
            }
        }
        navigate('/myorders');
    }

    const rzpHandler = async (response) => {
        const orderId = rzpOrderId.current; // got in previous api call to create order
        const paymentId = response.razorpay_payment_id;
        const signature = response.razorpay_signature;
        const generatedSignature = CryptoJS.HmacSHA256(`${orderId}|${paymentId}`, RAZORPAY_KEY_SECRET).toString();
        if(generatedSignature === signature) {
            // payment success and signature verified
            await addOrder();
        } else {
            alert("Invalid Payment: Signature not verified!");
        }
    }

    const handleCheckout = async () => {
        if((address === '')||(city === '')||(state === '')||(pin === '')||(payChosen === '')) setIsEmpty(true);
        else {
            if(payChosen === PaymentOptions.CASH_ON_DELIVERY) {
                await addOrder();
            }
            if(payChosen === PaymentOptions.RAZORPAY) {
                const paymentFuncRet = await createRzpOrder(price);
                if(paymentFuncRet.isSuccess && paymentFuncRet.orderId) {
                    rzpOrderId.current = paymentFuncRet.orderId;
                    renderCheckoutConfig({
                        amount: price,
                        order_id: paymentFuncRet.orderId,
                        name: String(currUser?.firstname + " " + currUser?.lastname),
                        email: String(currUser?.email),
                        phone: String(currUser?.phone),
                        color: "#3399cc",
                        handlePaymentSuccess: rzpHandler
                    });
                } else {
                    alert("Failed to generate Razorpay order");
                }
            }
        }
    }

    return(
        <>
            { (isLoading) && <Spinner /> }
            {
                (!isLoading && currUser) &&
                <>
                <div className="container checkout">
                    <h1>ORDER DETAILS: </h1>
                    <div className="checkout_field">
                        <label htmlFor="checkout_name">Name:</label>
                        <input id="checkout_name" readOnly value={currUser.firstname + ' ' + currUser.lastname} />
                    </div>
                    <div className="checkout_field">
                        <label htmlFor="checkout_phone">Phone:</label>
                        <input id="checkout_phone" readOnly value={currUser.phone} />
                    </div>
                    <div className="checkout_field">
                        <label htmlFor="checkout_email">Email:</label>
                        <input id="checkout_email" readOnly value={currUser.email} />
                    </div>
                    <div className="checkout_field">
                        <label htmlFor="checkout_address">Address:</label>
                        <input 
                            type="text" 
                            id="checkout_address"
                            placeholder='Enter Address'
                            onChange={(e) => setAddress(e.target.value)} 
                        />
                    </div>
                    <div className='checkout_field'>
                        <label htmlFor="checkout_city">City:</label>
                        <select id="checkout_city" onChange={(e) => setCity(e.target.value)}>
                            <option value="">Select City</option>
                            {
                                cityList.map(data => {
                                    return(
                                        <option value={data}>{data}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div className='checkout_field'>
                        <label htmlFor="checkout_state">State:</label>
                        <select id="checkout_state" onChange={(e) => setState(e.target.value)}>
                            <option value="">Select State</option>
                            {
                                stateList.map(data => {
                                    return(
                                        <option value={data}>{data}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div className='checkout_field'>
                        <label htmlFor="checkout_pin">Pin:</label>
                        <input 
                            type="text" 
                            id="checkout_pin" 
                            placeholder='Enter pin'
                            onChange={(e) => setPin(e.target.value)}
                        />
                    </div>
                    <div className='checkout_field'>
                        <label htmlFor="checkout_price">Price: </label>
                        <input id="checkout_price" readOnly value={String.fromCharCode(8377)+' '+price} />
                    </div>
                    <div className='checkout_field'>
                        <label>Choose payment method:</label>
                        <div className="checkout_radio">
                            <input type="radio" name="pay_methods" id="checkout_cash" onChange={() => setPayChosen(PaymentOptions.CASH_ON_DELIVERY)}/>
                            <label htmlFor="checkout_cash">Cash on delivery</label>
                        </div>
                        <div className="checkout_radio">
                            <input type="radio" name="pay_methods" id="checkout_razorpay" onChange={() => setPayChosen(PaymentOptions.RAZORPAY)}/>
                            <label htmlFor="checkout_razorpay"><img src={RazorPay} alt='RazorPay'/></label>
                        </div>
                    </div>
                    { isEmpty && <p className="checkout_error">Please specify all fields</p> }
                    <button className='checkout_paybtn' onClick={handleCheckout}>Proceed</button>
                </div>
                </>
            }
        </>
    )
}

const mapStateToProps = function(state: IGlobalState) {
  return {
    cart: state.cart.items,
  }
}

const mapDispatchToProps = {
  setCartDispatch: setCartAction,
  addOrdersDispatch: addOrdersAction,
}

const CheckoutWrapped = connect(mapStateToProps, mapDispatchToProps)(Checkout);

export default CheckoutWrapped;