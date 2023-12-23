import { Link } from 'react-router-dom'
import './ProductCard.css'
import { IProduct } from '../../types/coreTypes'
import { STATIC_URL } from '../../config/keys'

interface IProductCardProps {
    product: IProduct
};

const ProductCard = ({ product } : IProductCardProps) => {
  let stars = "", dots = "";
  if(product.rating) {
    let i = 1;
    while(i < Number(product.rating)) {
      stars += "⭐";
      i++;
    }
    while(i <= 5) {
        dots += "•";
        i++;
    }
  }
  return (
    <Link to={"/product/"+product._id} className="productCard" style={{
        textDecoration: "none",
        color: "black"
    }}>
        <div className="productCardImg" style={{
            backgroundImage: `url(${STATIC_URL + product.imagePath})`
        }}></div>
        <div className="productCardDesc">
            <h4>{product.name}</h4>
            <p>
                <b> Rs {product.currentPrice}  </b>
                <span style={{
                    fontSize: `14px`,
                    textDecoration: `line-through`
                }}>{product.originalPrice}</span> 
                ({Math.ceil(((product.originalPrice - product.currentPrice) / product.originalPrice) * 100)}% off)
            </p>
            <h5 style={{ fontWeight: "normal" }}>
                {
                    (product.rating) ?
                    (product.rating !== -1) ?
                    (stars+dots+" "+product.rating) :
                    "No ratings"
                    :
                    ""
                }
            </h5>
        </div>
    </Link>
  )
}

export default ProductCard;