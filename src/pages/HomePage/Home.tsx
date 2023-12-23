import { useEffect, useState } from 'react'
import { getProducts } from '../../api/product'
import Spinner from '../../components/Spinner/Spinner'
import Carousel from '../../components/Carousel/Carousel'
import Collection from '../../components/Collection/Collection'
import { IEvent, IProduct } from '../../types/coreTypes'
import { getCategories } from '../../api/category'
import { getEvents } from '../../api/event'

interface IProductData {
  category: string,
  itemCount: number,
  products: IProduct[]
}

const Home = () => {

  useEffect(() => {
      window.scrollTo(0,0);
  }, []);

  const [isLoading, setIsLoading] = useState(false);
  const [productData, setProductData] = useState<IProductData[]>([]);
  const [eventData, setEventData] = useState<IEvent[]>([]);

  const getProductData = async () => {
      try {

          const tempProductData: IProductData[] = [];
          const categoryFuncRet = await getCategories();
          if(categoryFuncRet.isSuccess && categoryFuncRet.categories) {
              for(const category of categoryFuncRet.categories) {
                const productFuncRet = await getProducts({
                  categoryId: category._id,
                  page: 1,
                  limit: 3,
                });
                if(productFuncRet.isSuccess && productFuncRet.products && (productFuncRet.products.length > 0)) {
                  tempProductData.push({
                    category: category.name,
                    itemCount: category.itemCount,
                    products: productFuncRet.products
                  });
                }
              }
              setProductData(tempProductData);
          } else {
              console.error("Unable to fetch products data");
          }

          const eventFuncRet = await getEvents();
          if(eventFuncRet.isSuccess && eventFuncRet.events) {
              setEventData(eventFuncRet.events);
          } else {
              console.error("Unable to fetch products data");
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
  }, []);

  return (
    <>
    {
      (!isLoading) ?
      <>
      {
        (productData.length > 0) ?
        <>
          <Carousel eventData={eventData} />
          {
            productData.map((data) => {
              return <Collection category={data.category} products={data.products} url="/search" />
            })
          }
        </> :
        <h2>No products to display</h2>
      }
      </> :
      <Spinner />
    }
    </>
  )
}

export default Home
