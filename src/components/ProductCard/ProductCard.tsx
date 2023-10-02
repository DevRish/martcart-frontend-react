import { Link } from 'react-router-dom'
import './ProductCard.css'
import { SERVER_URL } from '../../config/keys'
import { IProduct } from '../../types/coreTypes'

interface IProductCardProps {
    product: IProduct
};

const ProductCard = ({ product } : IProductCardProps) => {
  return (
    <Link to={"/product/"+product._id} className="productCard" style={{
        textDecoration: "none",
        color: "black"
    }}>
        <div className="productCardImg" style={{
            backgroundImage: `url(${SERVER_URL}${product.img_url})`
        }}></div>
        <div className="productCardDesc">
            <h4>{product.prod_name}</h4>
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
    </Link>
  )
}

export default ProductCard;