import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FiShoppingCart, FiArrowLeft, FiCheck, FiTag, FiBox, FiInfo } from 'react-icons/fi';
import { getProductById } from '../services/productService';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const loadProduct = () => {
      const productData = getProductById(id);
      
      if (!productData) {
        toast.error('Product not found');
        navigate('/marketplace');
        return;
      }
      
      setProduct(productData);
      setIsLoading(false);
    };
    
    loadProduct();
  }, [id, navigate]);
  
  const handleAddToCart = () => {
    if (!isAuthenticated) {
      toast.error('Please login to add items to your cart');
      navigate('/login');
      return;
    }
    
    addToCart(product, quantity);
  };
  
  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    setQuantity(Math.max(1, Math.min(value, product?.stock || 99)));
  };
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-primary-600 border-solid"></div>
      </div>
    );
  }
  
  if (!product) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
        <p className="mb-8">The product you're looking for doesn't exist or has been removed.</p>
        <button
          onClick={() => navigate('/marketplace')}
          className="btn-primary flex items-center mx-auto"
        >
          <FiArrowLeft className="mr-2" /> Back to Marketplace
        </button>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-600 hover:text-primary-600 mb-6 transition-colors"
      >
        <FiArrowLeft className="mr-2" /> Back
      </button>
      
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover object-center"
              style={{ maxHeight: '500px' }}
            />
          </div>
          
          {/* Product Details */}
          <div className="p-6 md:p-8">
            <div className="flex flex-col h-full">
              <div>
                <div className="flex items-center mb-4">
                  <span className="bg-primary-100 text-primary-800 text-xs px-2 py-1 rounded mr-2">
                    {product.category}
                  </span>
                  {product.isSustainable && (
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded flex items-center">
                      <FiCheck className="mr-1" /> Sustainable
                    </span>
                  )}
                </div>
                
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
                
                <div className="text-2xl font-bold text-primary-600 mb-6">
                  ${product.price.toFixed(2)}
                </div>
                
                <div className="mb-6 text-gray-700">
                  <p>{product.description}</p>
                </div>
                
                {product.isSustainable && product.sustainabilityInfo && (
                  <div className="mb-6 bg-green-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-green-800 mb-2 flex items-center">
                      <FiInfo className="mr-2" /> Sustainability Information
                    </h3>
                    <p className="text-green-700 text-sm">{product.sustainabilityInfo}</p>
                  </div>
                )}
                
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <div className="flex items-center">
                    <FiTag className="text-gray-500 mr-2" />
                    <span className="text-sm text-gray-700">
                      <span className="font-medium">Category:</span> {product.category}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <FiBox className="text-gray-500 mr-2" />
                    <span className="text-sm text-gray-700">
                      <span className="font-medium">Stock:</span> {product.stock} available
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center mb-8">
                  <span className="text-sm text-gray-700 mr-4">
                    Seller: {product.sellerName}
                  </span>
                </div>
              </div>
              
              <div className="mt-auto">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="sm:w-1/3">
                    <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
                      Quantity
                    </label>
                    <input
                      type="number"
                      id="quantity"
                      min="1"
                      max={product.stock}
                      value={quantity}
                      onChange={handleQuantityChange}
                      className="form-input"
                    />
                  </div>
                  
                  <div className="sm:w-2/3 flex items-end">
                    <button
                      onClick={handleAddToCart}
                      disabled={product.stock <= 0}
                      className={`btn-primary py-3 w-full flex items-center justify-center ${
                        product.stock <= 0 ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    >
                      <FiShoppingCart className="mr-2" />
                      {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;