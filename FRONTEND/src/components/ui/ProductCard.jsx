import { Link } from 'react-router-dom';
import { FiShoppingCart } from 'react-icons/fi';
import { useCart } from '../../contexts/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  
  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };
  
  return (
    <div className="card group hover:transform hover:scale-[1.01] transition-all duration-300">
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative overflow-hidden aspect-square">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {product.isSustainable && (
            <div className="absolute top-2 right-2 bg-primary-600 text-white text-xs font-bold px-2 py-1 rounded">
              Sustainable
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">{product.name}</h3>
          <p className="text-sm text-gray-600 mt-1 line-clamp-2">{product.description}</p>
          
          <div className="flex items-center justify-between mt-3">
            <span className="text-lg font-semibold text-gray-900">
              ${product.price.toFixed(2)}
            </span>
            <button 
              onClick={handleAddToCart}
              className="btn-primary p-2 rounded-full flex items-center justify-center"
              aria-label="Add to cart"
            >
              <FiShoppingCart className="h-5 w-5" />
            </button>
          </div>
          
          <div className="mt-3">
            <span className="inline-block bg-secondary-100 text-secondary-800 text-xs px-2 py-1 rounded mr-2">
              {product.category}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;