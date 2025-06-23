import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ui/ProductCard';
import { getApprovedProducts, filterProductsByCategory } from '../services/productService';

const MarketplacePage = () => {
  const [products, setProducts] = useState({
    rawMaterials: [],
    sustainableMaterials: []
  });
  const [activeSection, setActiveSection] = useState('raw-materials');
  const [activeCategory, setActiveCategory] = useState('all');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');
  
  // Category definitions for each section
  const categoryFilters = {
    'raw-materials': [
      { value: 'all', label: 'All Categories' },
      { value: 'plastics', label: 'Plastics' },
      { value: 'metals', label: 'Metals' },
      { value: 'paper', label: 'Paper' },
      { value: 'glass', label: 'Glass' },
      { value: 'organic', label: 'Organic' },
      { value: 'textile', label: 'Textile' }
    ],
    'sustainable-materials': [
      { value: 'all', label: 'All Categories' },
      { value: 'energy', label: 'Energy' },
      { value: 'packaging', label: 'Packaging' },
      { value: 'building', label: 'Building' },
      { value: 'agriculture', label: 'Agriculture' }
    ]
  };
  
  useEffect(() => {
    const loadProducts = () => {
      setIsLoading(true);
      let productsData = categoryParam ? filterProductsByCategory(categoryParam) : getApprovedProducts();
      
      // Split products by section
      const rawMaterials = productsData.filter(p => p.section === 'raw-materials');
      const sustainableMaterials = productsData.filter(p => p.section === 'sustainable-materials');
      
      setProducts({
        rawMaterials,
        sustainableMaterials
      });
      setIsLoading(false);
    };
    
    loadProducts();
  }, [categoryParam]);

  // Filter products based on active section and category
  useEffect(() => {
    const currentProducts = activeSection === 'raw-materials' 
      ? products.rawMaterials 
      : products.sustainableMaterials;
    
    if (activeCategory === 'all') {
      setFilteredProducts(currentProducts);
    } else {
      const filtered = currentProducts.filter(product => 
        product.category.toLowerCase() === activeCategory.toLowerCase()
      );
      setFilteredProducts(filtered);
    }
  }, [activeSection, activeCategory, products]);

  const handleSectionChange = (section) => {
    setActiveSection(section);
    setActiveCategory('all'); // Reset category filter when switching sections
  };

  const handleCategoryFilter = (category) => {
    setActiveCategory(category);
  };
  
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
      
      {/* Section Tabs */}
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => handleSectionChange('raw-materials')}
          className={`px-6 py-3 rounded-lg font-medium transition-colors ${
            activeSection === 'raw-materials'
              ? 'bg-primary-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Raw Materials
        </button>
        <button
          onClick={() => handleSectionChange('sustainable-materials')}
          className={`px-6 py-3 rounded-lg font-medium transition-colors ${
            activeSection === 'sustainable-materials'
              ? 'bg-primary-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Sustainable Products
        </button>
      </div>

      {/* Category Filter Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center text-gray-600 font-medium">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.414A1 1 0 013 6.707V4z" />
            </svg>
            Filter by:
          </div>
          
          <div className="flex flex-wrap gap-2">
            {categoryFilters[activeSection].map((category) => (
              <button
                key={category.value}
                onClick={() => handleCategoryFilter(category.value)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeCategory === category.value
                    ? 'bg-primary-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-sm'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center my-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-primary-600 border-solid"></div>
        </div>
      ) : (
        <div>
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-lg text-gray-600">No products found in this category.</p>
              <p className="text-gray-500 mt-2">Try selecting a different category or section.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MarketplacePage;