import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductDeck from '../../components/ProductDeck/ProductDeck';
import { getProducts } from '../../api/product';
import './CategoryPage.css';
import Spinner from '../../components/Spinner/Spinner';
import { IProduct } from '../../types/coreTypes';

const CategoryPage = () => {

    useEffect(() => {
        window.scrollTo(0,0);
    }, [])

    const { category } = useParams();
    const [searchText, setSearchText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [products, setProducts] = useState<IProduct[]>([]);
    const [shownProducts, setShownProducts] = useState<IProduct[]>([]);

    const getProductData = async () => {
        try {
            const productFuncRet = await getProducts();
            if(productFuncRet.isSuccess && productFuncRet.products) {
                setProducts(productFuncRet.products);
            } else {
                throw new Error("Unable to fetch products data");
            }
        } catch(error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    const filterData = () => {
        if(products.length !== 0) {
            if(searchText === '') {
                if(category) setShownProducts(products.filter((product) => product.tags.includes(category)) );
                else setShownProducts(products);
            }
            else {
                setShownProducts(products.filter((product) => product.prod_name.toLowerCase().includes(searchText.toLowerCase())) );
            }
        }
    }

    useEffect(() => {
        filterData();
    }, [searchText, products]);

    useEffect(() => {
        setIsLoading(true);
        getProductData();
    }, []);

    return (
        <div className="container">
            <h1 className='mainHeading'> 🛍️ Our Products 🛍️ </h1>
            <input type="text" placeholder='Search Your Desire' 
                style={{
                    width: "100%",
                    marginBottom: "2rem",
                    fontSize: "2rem",
                    padding: "1rem 2rem",
                    borderRadius: "1rem"
                }}
                onChange={(e) => setSearchText(e.target.value)}
            />
            {
                (!isLoading) ? 
                shownProducts.length !== 0 ?
                <ProductDeck products={shownProducts} /> :
                <h1>No results found for your search</h1>
                :
                <Spinner />
            }
        </div>
    )
}

export default CategoryPage;
