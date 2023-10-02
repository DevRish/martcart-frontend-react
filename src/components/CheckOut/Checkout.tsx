import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { stateList, cityList } from '../../helpers/locationsList';
import { getUserData } from "../../api/user";
import { addNewOrder } from "../../api/order";
import { emptyCart } from "../../api/cart";
import Spinner from "../Spinner/Spinner";
import RazorPay from './../../assets/razorpay.svg';
import './Checkout.css';
import { ICartItem, IGlobalCartState, IGlobalState, IOrder, IUser } from "../../types/coreTypes";
import { connect } from "react-redux";
import { setCartAction } from "../../reducers/cart/cartActions";
import { addOrderAction } from "../../reducers/order/orderActions";

interface ICheckoutProps {
    // Global State props
    cart: ICartItem[],
    setCartDispatch: (newCart: IGlobalCartState) => void,
    addOrderDispatch: (order: IOrder) => void,
    // Local State props
    currItemId: string,
    price: number,
    isCart: boolean, // tells whether single item checkout or cart checkout
};

const Checkout = ({ cart, currItemId, price, isCart, setCartDispatch, addOrderDispatch } : ICheckoutProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [currUser, setCurrUser] = useState<IUser>();
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [pin, setPin] = useState('');
    const [payChosen, setPayChosen] = useState(false);
    const [isEmpty, setIsEmpty] = useState(false);
    let navigate = useNavigate();

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
        if((address === '')||(city === '')||(state === '')||(pin === '')||(!payChosen)) setIsEmpty(true);
        else
        {
            if(isCart) {
                for(let item of cart) {
                    const orderFuncRet = await addNewOrder({
                        productId: String(item._id),
                        quantity: item.quantity,
                        address: (address+', '+city+', '+state+' - '+pin),
                    });
                    if(orderFuncRet.order) {
                        addOrderDispatch(orderFuncRet.order);
                    }
                }
                await emptyCart();
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
                    addOrderDispatch(orderFuncRet.order);
                }
            }
            navigate('/myorders');
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
                            <input type="radio" name="pay_methods" id="checkout_cash" onChange={() => setPayChosen(true)}/>
                            <label htmlFor="checkout_cash">Cash on delivery</label>
                        </div>
                        <div className="checkout_radio">
                            <input type="radio" name="pay_methods" id="checkout_razorpay" onChange={() => setPayChosen(true)}/>
                            <label htmlFor="checkout_razorpay"><img src={RazorPay} alt='RazorPay'/></label>
                        </div>
                    </div>
                    { isEmpty && <p className="checkout_error">Please specify all fields</p> }
                    <button className='checkout_paybtn' onClick={addOrder}>Proceed</button>
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
  addOrderDispatch: addOrderAction,
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);