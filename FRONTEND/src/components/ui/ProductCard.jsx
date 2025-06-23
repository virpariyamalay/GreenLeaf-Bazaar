import { Link } from 'react-router-dom';
import { FiMapPin, FiPackage } from 'react-icons/fi';
import { useCart } from '../../contexts/CartContext';
import { toast } from 'react-toastify';

const ProductCard = ({ product }) => {
  const { addToCart, cartItems } = useCart();
  
  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();

    // Get current quantity in cart
    const currentCartItem = cartItems.find(item => item.id === product.id);
    const currentQuantity = currentCartItem ? currentCartItem.quantity : 0;
    
    // Check if adding one more would exceed stock
    if (currentQuantity + 1 > product.stock) {
      toast.error('Cannot add more items - stock limit reached');
      return;
    }
    
    addToCart(product);
  };
  
  const isOutOfStock = product.stock <= 0;
  
  // Get category color based on category type
  const getCategoryColor = (category) => {
    const colors = {
      'paper': 'bg-green-100 text-green-800',
      'plastics': 'bg-orange-100 text-orange-800',
      'metals': 'bg-blue-100 text-blue-800',
      'glass': 'bg-purple-100 text-purple-800',
      'organic': 'bg-yellow-100 text-yellow-800',
      'textile': 'bg-pink-100 text-pink-800',
      'energy': 'bg-red-100 text-red-800',
      'packaging': 'bg-indigo-100 text-indigo-800',
      'building': 'bg-gray-100 text-gray-800',
      'agriculture': 'bg-lime-100 text-lime-800'
    };
    return colors[category.toLowerCase()] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-48 object-cover"
          />
          {/* Category Badge */}
          <div className={`absolute top-3 right-3 px-2 py-1 rounded text-xs font-medium ${getCategoryColor(product.category)}`}>
            {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
          </div>
        </div>
        
        <div className="p-4">
          {/* Product Title */}
          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">
            {product.name}
          </h3>
          
          {/* Product Description */}
          <p className="text-sm text-gray-600 mb-3 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
          
          {/* Price */}
          <div className="flex items-center mb-3">
            <span className="text-lg font-bold text-gray-900">
              ₹ {product.price.toFixed(0)}
            </span>
          </div>
          
          {/* Stock Status */}
          <div className="flex items-center mb-3">
            <FiPackage className="w-4 h-4 text-gray-500 mr-2" />
            {isOutOfStock ? (
              <span className="text-red-600 text-sm font-medium">Out of Stock</span>
            ) : (
              <span className="text-green-600 text-sm">
                {product.stock} {product.stock > 1000 ? 'kg' : product.stock > 100 ? 'tons' : 'units'} available
              </span>
            )}
          </div>
          
          {/* Location */}
          <div className="flex items-center mb-4">
            <FiMapPin className="w-4 h-4 text-gray-500 mr-2" />
            <span className="text-sm text-gray-600">
              {product.address ? product.address.split(',').slice(-2).join(',').trim() : 'Location not specified'}
            </span>
          </div>
          
          {/* Seller Info */}
          <div className="mb-4">
            <span className="text-sm text-gray-600">
              {product.sellerName || product.businessName || 'Verified Seller'}
            </span>
          </div>
        </div>
      </Link>
      
      {/* Add to Cart Button */}
      <div className="px-4 pb-4">
        <button
          onClick={handleAddToCart}
          disabled={isOutOfStock}
          className={`w-full py-2 px-4 rounded-md font-medium transition-colors ${
            isOutOfStock
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-green-600 hover:bg-green-700 text-white'
          }`}
        >
          {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;