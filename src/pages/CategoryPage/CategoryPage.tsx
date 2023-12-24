import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductDeck from '../../components/ProductDeck/ProductDeck';
import Pagination from '../../components/Pagination/Pagination';
import { getProducts } from '../../api/product';
import './CategoryPage.css';
import Spinner from '../../components/Spinner/Spinner';
import { IProduct } from '../../types/coreTypes';

const LIMIT = 8;

const CategoryPage = () => {

    const { categoryId } = useParams();
    const [searchText, setSearchText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [products, setProducts] = useState<IProduct[]>([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);

    const getProductData = async () => {
        try {
            const productFuncRet = await getProducts({ categoryId, name: searchText, page, limit: LIMIT });
            if(productFuncRet.isSuccess && productFuncRet.products) {
                setProducts(productFuncRet.products);
                setTotal(productFuncRet.total || 0);
            } else {
                throw new Error("Unable to fetch products data");
            }
        } catch(error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        setIsLoading(true);
        getProductData();
    }, [searchText, page]);

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
                products.length !== 0 ?
                <>
                    <ProductDeck products={products} />
                    <Pagination page={page} setPage={setPage} total={total} limit={LIMIT} />
                </> :
                <h1>No results found for your search</h1>
                :
                <Spinner />
            }
        </div>
    )
}

export default CategoryPage;
