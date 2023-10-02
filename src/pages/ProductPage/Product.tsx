import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import { addCartItem } from '../../api/cart';
import Checkout from '../../components/CheckOut/Checkout';
import Spinner from '../../components/Spinner/Spinner'
import "./../OrdersPage/MyOrders.css"
import "./Product.css"
import { IGlobalState, IProduct } from '../../types/coreTypes';
import { getProductById } from '../../api/product';
import { connect } from 'react-redux';
import { addItemToCartAction } from '../../reducers/cart/cartActions';

interface IProductProps {
    // Global State Props
    isLoggedIn: boolean,
    addItemToCartDispatch: (product: IProduct) => void,
};

const Product = ({ isLoggedIn, addItemToCartDispatch } : IProductProps) => {
    const [checkoutVis, setCheckoutVis] = useState(false);
    
    const [isLoading, setIsLoading] = useState(false);
    const [product, setProduct] = useState<IProduct>();

    const { id } = useParams();

    const getProductData = async () => {
        try {
            const productFuncRet = await getProductById(String(id));
            if(productFuncRet.isSuccess && productFuncRet.product) {
                setProduct(productFuncRet.product);
            } else {
                throw new Error("Unable to fetch product data");
            }
        } catch(error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }
    let navigate = useNavigate();

    useEffect(() => {
        setIsLoading(true);
        getProductData();
    }, [product]);

    const addToCart = () => {
        addCartItem(String(id));
        if(product) {
            addItemToCartDispatch(product);
        }
        navigate('/cart');
    }

    return (
        <>
        {
            (!isLoading && product) ?
            <div className="container">
                <div className="orderCard">
                    <div className="orderImg" style={{
                        backgroundImage: `url(${product.img_url})`
                    }}></div>
                    <div className="orderDesc">
                        <h4>{product.prod_name}</h4>
                        <div style={{ fontSize: "1.8rem", marginBottom: "1rem" }}>
                            <p>
                                <b> Rs {Math.ceil((product.price)*( 1 - (product.discount_percent*0.01)))}  </b>
                                <span style={{
                                    fontSize: `14px`,
                                    textDecoration: `line-through`
                                }}>{product.price}</span> 
                                ({product.discount_percent}% off)
                            </p>
                            <h5 style={{ fontWeight: "normal" }}>⭐⭐⭐⭐⭐ 5.0</h5>
                            <h5 style={{ fontWeight: "normal" }}>Free Delivery</h5>
                        </div>
                        {
                            (isLoggedIn) ?
                            <div className='prodbtns'>
                                <button onClick={() => setCheckoutVis(!checkoutVis)} style={{ marginRight: "2rem" }}>Buy Now</button>
                                <button onClick={addToCart}>Add to cart</button>
                            </div> :
                            <p className='prodbtns' style={{ fontSize: "2rem" }}>
                                Please 
                                <Link to="/authpage" style={{
                                    textDecoration: "none",
                                    fontSize: "2rem",
                                    fontWeight: "bold",
                                    margin: "0 0.6rem",
                                    color: "#230033"
                                }}>SignIn</Link>
                                to buy this product
                            </p>

                        }
                    </div>
                </div>
                {
                    (checkoutVis && isLoggedIn) && 
                    <Checkout 
                        isCart={false} 
                        currItemId={String(product._id)}
                        price={ Math.ceil((product.price)*( 1 - (product.discount_percent*0.01))) }
                    />
                }
            </div> :
            <Spinner />
        }
        </>
    )
}

const mapStateToProps = function(state: IGlobalState) {
  return {
    isLoggedIn: state.auth.isLoggedIn,
  }
}

const mapDispatchToProps = {
  addItemToCartDispatch: addItemToCartAction,
}

export default connect(mapStateToProps, mapDispatchToProps)(Product);
