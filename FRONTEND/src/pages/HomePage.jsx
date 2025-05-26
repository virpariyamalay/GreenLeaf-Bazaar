import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiShoppingBag, FiCheck, FiShield } from 'react-icons/fi';
import ProductList from '../components/ui/ProductList';
import { getProducts } from '../services/productService';

const HomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProducts = () => {
      const products = getProducts();
      // Get 4 random products as featured
      const randomProducts = [...products].sort(() => 0.5 - Math.random()).slice(0, 4);
      setFeaturedProducts(randomProducts);
      setIsLoading(false);
    };

    loadProducts();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-16 md:py-24 rounded-xl overflow-hidden relative">
        <div className="container-custom relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight animate-slide-up">
              Sustainable Solutions for a Greener Tomorrow
            </h1>
            <p className="text-xl mb-8 opacity-90 animate-slide-up" style={{ animationDelay: '0.1s' }}>
              Connect with eco-conscious sellers and buyers in the premier marketplace for sustainable raw materials and products.
            </p>
            <div className="flex flex-wrap gap-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <Link to="/marketplace" className="btn bg-white text-primary-700 hover:bg-gray-100 font-medium px-6 py-3 rounded-md">
                Browse Marketplace
              </Link>
              <Link to="/register" className="btn bg-transparent border-2 border-white text-white hover:bg-white/10 font-medium px-6 py-3 rounded-md">
                Join Now
              </Link>
            </div>
          </div>
        </div>
        
        {/* Background pattern */}
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
            <path d="M0,0 L100,0 L100,100 L0,100 Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose GreenFuelMarket?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
              <div className="bg-primary-100 text-primary-600 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <FiCheck className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Verified Sustainable Products</h3>
              <p className="text-gray-600">
                All products undergo thorough verification to ensure they meet our sustainability standards.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
              <div className="bg-primary-100 text-primary-600 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <FiShield className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Secure Transactions</h3>
              <p className="text-gray-600">
                Our platform ensures safe and transparent transactions between buyers and sellers.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
              <div className="bg-primary-100 text-primary-600 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <FiShoppingBag className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Direct Connection</h3>
              <p className="text-gray-600">
                Connect directly with eco-conscious sellers and buyers, eliminating unnecessary intermediaries.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Featured Products</h2>
            <Link to="/marketplace" className="text-primary-600 hover:text-primary-700 flex items-center">
              View all <FiArrowRight className="ml-2" />
            </Link>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-primary-600 border-solid"></div>
            </div>
          ) : featuredProducts.length > 0 ? (
            <ProductList initialProducts={featuredProducts} showFilters={false} />
          ) : (
            <div className="text-center py-12 bg-white rounded-lg shadow-sm">
              <p className="text-lg mb-4">No products available yet.</p>
              <Link to="/seller/add-product" className="btn-primary inline-flex items-center">
                Be the first to add a product <FiArrowRight className="ml-2" />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16">
        <div className="container-custom">
          <div className="bg-secondary-600 text-white rounded-xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0 md:mr-8 text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Start Selling?</h2>
              <p className="text-secondary-100 max-w-md">
                Join our community of sustainable sellers and reach eco-conscious buyers globally.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/register" className="btn bg-white text-secondary-700 hover:bg-gray-100 font-medium px-6 py-3 rounded-md whitespace-nowrap">
                Register as Seller
              </Link>
              <Link to="/login" className="btn bg-transparent border-2 border-white text-white hover:bg-white/10 font-medium px-6 py-3 rounded-md">
                Login
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;