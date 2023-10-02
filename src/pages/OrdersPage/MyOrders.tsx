import { useEffect } from 'react';
import "./MyOrders.css";
import { IGlobalState, IOrder } from '../../types/coreTypes';
import { connect } from 'react-redux';

interface IOrderProps {
    // Global State Props
    isLoggedIn: boolean,
    orders: IOrder[],
};

const MyOrders = ({ isLoggedIn, orders } : IOrderProps) => {

    useEffect(() => {
        window.scrollTo(0,0);
    }, []);

    return (
        <>
        {
            (isLoggedIn) ?
            <div className="container">
                { 
                    (orders.length !== 0) && 
                    <h1 className='mainHeading'>🛍️ Your Orders: 🛍️</h1> 
                }
                {
                    (orders.length !== 0) ?
                    orders.map((data, index) => {
                        return (
                            <div className="orderCard" key={index}>
                                <div className="orderImg" style={{
                                    backgroundImage: `url(${data.productId.img_url})`
                                }}></div>
                                <div className="orderDesc">
                                    <h3 style={{ fontSize: "3rem" }}>{data.productId.prod_name}</h3>
                                    <p style={{ fontSize: "2rem" }}>
                                        <b>Quantity:</b> {data.quantity} <br />
                                        <b>Total:</b> Rs {data.totalPrice} <br /> 
                                        Ordered on <b>{data.orderedAt}</b>
                                        <b>Delivered to address:</b> <br /> {data.address}
                                    </p>
                                </div>
                            </div>
                        )
                    }) : 
                    <h2 style={{ textAlign: 'center', fontSize: '3rem', paddingTop: '2rem' }}>You have not ordered anything yet</h2>
                }
            </div> :
            <div className="container">
                <h2 style={{ textAlign: 'center', fontSize: '3rem', paddingTop: '2rem' }}>Please signin to view your orders</h2>
            </div>
        }
        </>
    )
}

const mapStateToProps = function(state: IGlobalState) {
  return {
    isLoggedIn: state.auth.isLoggedIn,
    orders: state.orders,
  }
}

export default connect(mapStateToProps)(MyOrders);
