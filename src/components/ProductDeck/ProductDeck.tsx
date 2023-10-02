import { IProduct } from '../../types/coreTypes'
import ProductCard from '../ProductCard/ProductCard'
import './ProductDeck.css'

interface IProductDeckProps {
  products: IProduct[],
};

const ProductDeck = ({ products } : IProductDeckProps) => {
  return (
    <div className="grid">
        {
            products.map((product, index) => {
                return (
                    <ProductCard product={product} key={index} />
                )
            })
        }
    </div>
  )
}

export default ProductDeck