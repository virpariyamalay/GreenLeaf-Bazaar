import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductList from '../components/ui/ProductList';
import { getProducts, filterProductsByCategory } from '../services/productService';

const MarketplacePage = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');
  
  useEffect(() => {
    const loadProducts = () => {
      setIsLoading(true);
      let productsData;
      
      if (categoryParam) {
        productsData = filterProductsByCategory(categoryParam);
      } else {
        productsData = getProducts();
      }
      
      setProducts(productsData);
      setIsLoading(false);
    };
    
    loadProducts();
  }, [categoryParam]);
  
  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Marketplace
          </h1>
          <p className="text-gray-600 max-w-2xl">
            Browse our selection of sustainable products and raw materials from verified sellers.
          </p>
        </div>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center my-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-primary-600 border-solid"></div>
        </div>
      ) : (
        <ProductList initialProducts={products} />
      )}
    </div>
  );
};

export default MarketplacePage;