import { Link } from "react-router-dom";
import './Collection.css';
import ProductCard from '../ProductCard/ProductCard';
import { IProduct } from "../../types/coreTypes";

interface ICollectionProps {
    category: string,
    products: IProduct[];
    url: string,
}

const Collection = ({ category, products, url } : ICollectionProps) => {
    return (
        <div className="container">
            <h1 className="mainHeading">Best offers on {category}</h1>
            <div className="grid">
                {
                    products.map((product) => {
                        return (
                            <ProductCard product={product} key={product._id} />
                        )
                    })
                }
                <div className="categoryCardLast"><Link to={url}><i className="fas fa-arrow-right"></i></Link></div>
            </div>
        </div>
    )
}

export default Collection;
