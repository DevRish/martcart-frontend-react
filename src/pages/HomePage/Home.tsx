import { useEffect, useState } from 'react'
import { getProducts } from '../../api/product'
import Spinner from '../../components/Spinner/Spinner'
import Carousel from '../../components/Carousel/Carousel'
import Collection from '../../components/Collection/Collection'
import { IProduct } from '../../types/coreTypes'

const Home = () => {

  useEffect(() => {
      window.scrollTo(0,0);
  }, []);

  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState<IProduct[]>([]);

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

  useEffect(() => {
      setIsLoading(true);
      getProductData();
  }, [products]);

  let FootwearData : IProduct[] = [];
  let FashionData : IProduct[] = [];
  let WinterwearData : IProduct[] = [];
  let ElectronicsData : IProduct[] = [];
  if(!isLoading) {
    FootwearData = products.filter((product) => product.tags.includes("shoe"));
    FashionData = products.filter((product) => product.tags.includes("fashion"));
    WinterwearData = products.filter((product) => product.tags.includes("winterwear"));
    ElectronicsData = products.filter((product) => product.tags.includes("technology"));
  }
  return (
    <>
    <Carousel />
    {
      (!isLoading) ?
      <>
      <Collection category="Shoes" catData={FootwearData.slice(0,3)} catUrl="/search" />
      <Collection category="Fashion" catData={FashionData.slice(0,3)} catUrl="/search" />
      <Collection category="Winterwear" catData={WinterwearData.slice(0,3)} catUrl="/search" />
      <Collection category="Technology" catData={ElectronicsData.slice(0,3)} catUrl="/search" />
      </> :
      <Spinner />
    }
    </>
  )
}

export default Home
