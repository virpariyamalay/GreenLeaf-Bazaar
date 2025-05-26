import { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { searchProducts, filterProductsByCategory } from '../../services/productService';

const ProductList = ({ initialProducts = null, title, showFilters = true }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    if (initialProducts) {
      setProducts(initialProducts);
      setFilteredProducts(initialProducts);
      setIsLoading(false);
    } else {
      // If no products provided, get them from the service
      const allProducts = searchProducts('');
      setProducts(allProducts);
      setFilteredProducts(allProducts);
      setIsLoading(false);
    }
  }, [initialProducts]);
  
  useEffect(() => {
    // Filter products when search or category changes
    let results = products;
    
    if (searchQuery) {
      results = searchProducts(searchQuery);
    }
    
    if (selectedCategory !== 'all') {
      results = filterProductsByCategory(selectedCategory);
      
      // If also searching, filter the search results by category
      if (searchQuery) {
        results = results.filter(product => 
          product.category.toLowerCase() === selectedCategory.toLowerCase()
        );
      }
    }
    
    setFilteredProducts(results);
  }, [searchQuery, selectedCategory, products]);
  
  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'raw-materials', label: 'Raw Materials' },
    { value: 'biofuel', label: 'Biofuel' },
    { value: 'renewable-energy', label: 'Renewable Energy' },
    { value: 'eco-friendly', label: 'Eco-Friendly Products' }
  ];
  
  if (isLoading) {
    return (
      <div className="flex justify-center my-8">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-primary-600 border-solid"></div>
      </div>
    );
  }
  
  return (
    <div className="w-full">
      {title && <h2 className="text-2xl font-bold mb-6">{title}</h2>}
      
      {showFilters && (
        <div className="mb-8 flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="form-input w-full"
            />
          </div>
          <div className="sm:w-48">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="form-input w-full"
            >
              {categories.map(category => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
      
      {filteredProducts.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-lg text-gray-600">No products found.</p>
          <p className="text-gray-500 mt-2">Try changing your search or filter criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;