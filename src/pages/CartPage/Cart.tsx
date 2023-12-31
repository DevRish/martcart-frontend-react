import { useState, useEffect } from 'react';
import { removeCartItem } from '../../api/cart';
import Checkout from '../../components/CheckOut/Checkout';
import "./Cart.css";
import { IGlobalCartState, IGlobalState } from '../../types/coreTypes';
import { removeItemFromCartAction } from '../../reducers/cart/cartActions';
import { connect } from 'react-redux';
import { STATIC_URL } from '../../config/keys';

interface ICartProps {
    // Global State Props
    isLoggedIn: boolean,
    cart: IGlobalCartState,
    removeItemFromCartDispatch: (productId: string) => void,
}

const Cart = ({ isLoggedIn, cart, removeItemFromCartDispatch } : ICartProps) => {

    useEffect(() => {
        window.scrollTo(0,0);
    }, [])

    const [checkoutVis, setCheckoutVis] = useState(false);

    const totalFunc = () => {
        let total = 0;
        for(const item of cart.items) {
            total += (item.quantity * item.productId.currentPrice);
        }
        return total;
    }

    const removeFromCart = (id: string) => {
        removeCartItem(id);
        removeItemFromCartDispatch(id);
    }

    return (
        <>
        {
            (isLoggedIn) ?
            <div className="cartContainer">
                {
                    (cart.items.length !== 0) && 
                    <span className='totalPrice'><h1>Total Price : Rs { totalFunc() }</h1><button onClick={() => setCheckoutVis(!checkoutVis)}>Buy Now</button></span>
                }
                {
                    (checkoutVis && isLoggedIn) && 
                    <Checkout
                        isCart={true} 
                        currItemId={""}
                        price={ totalFunc() }
                    />
                }
                {
                    (cart.items.length !== 0) ?
                    cart.items.map((item, index) => {
                        const product = item.productId;
                        return (
                            <div className="cartCard" key={index}>
                                <div className="cartImg" style={{
                                    backgroundImage: `url(${STATIC_URL + product.imagePath})`
                                }}></div>
                                <div className="cartDesc">
                                    <h4>{product.name}</h4>
                                    <div style={{ fontSize: "1.8rem", marginBottom: "1.5rem" }}>
                                        <p>
                                            <b> Rs {item.quantity * product.currentPrice}  </b>
                                        </p>
                                        <p> <b>Quantity:</b> {item.quantity} </p>
                                        <h5 style={{ fontWeight: "normal" }}>⭐⭐⭐⭐⭐ 5.0</h5>
                                        <h5 style={{ fontWeight: "normal" }}>Free Delivery</h5>
                                    </div>
                                    <button onClick={() => removeFromCart(String(product._id))}>Remove From Cart</button>
                                </div>
                            </div>
                        )
                    }) :
                    <h2 style={{ textAlign: 'center', fontSize: '3rem', paddingTop: '2rem' }}>No items to display in cart</h2>
                }
            </div> :
            <div className="cartContainer">
                <h2 style={{ textAlign: 'center', fontSize: '3rem', paddingTop: '2rem' }}>Please signin to view your cart</h2>
            </div>
        }
        </>
    )
}

const mapStateToProps = function(state: IGlobalState) {
  return {
    isLoggedIn: state.auth.isLoggedIn,
    cart: state.cart,
  }
}

const mapDispatchToProps = {
  removeItemFromCartDispatch: removeItemFromCartAction,
}

const CartWrapped = connect(mapStateToProps, mapDispatchToProps)(Cart);

export default CartWrapped;
