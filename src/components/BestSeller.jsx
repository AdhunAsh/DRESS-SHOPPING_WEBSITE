import { useContext, useEffect, useState } from "react";
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';

const BestSeller = () => {

    const { products, backendUrl } = useContext(ShopContext);
    const [bestSeller, setBestSeller] = useState([]);

    useEffect(() => {
        const bestProduct = products.filter(product => product.bestseller );
        setBestSeller(bestProduct.slice(0,5));
     }, [products]);
    
 
  return (
    <div className='my-10'>
        <div className='text-center py-8 text-3xl'>
            <Title text1={" BEST "} text2={" SELLER "} />
        </div>

        {/* product rendering */}
        {/* {console.log("Best Seller:", bestSeller)} */}

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
            {
                bestSeller.map((item,index)=>(
                    <ProductItem
                        key={index}
                        id={item.id}
                        image={`${backendUrl}${item.images[0].image}`}
                        name={item.name}
                        price={item.price}
                    />
                ))
            }
        </div>

    </div>
  )
}

export default BestSeller