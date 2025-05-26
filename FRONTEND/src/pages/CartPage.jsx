import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FiShoppingBag, FiTrash2, FiArrowRight, FiArrowLeft } from 'react-icons/fi';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';

const CartPage = () => {
  const { cartItems, cartTotal, updateQuantity, removeFromCart, clearCart, checkout } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  
  const handleCheckout = async () => {
    if (!isAuthenticated) {
      toast.error('Please login to checkout');
      navigate('/login');
      return;
    }
    
    if (cartItems.length === 0) {
      toast.error('Your cart is empty');
      return;
    }
    
    setIsProcessing(true);
    
    try {
      const result = await checkout();
      
      if (result.success) {
        navigate('/profile');
      }
    } catch (error) {
      toast.error('An error occurred during checkout');
      console.error(error);
    } finally {
      setIsProcessing(false);
    }
  };
  
  if (!isAuthenticated) {
    return (
      <div className="text-center py-12">
        <FiShoppingBag className="mx-auto h-16 w-16 text-gray-400" />
        <h2 className="text-2xl font-bold mb-4 mt-4">Please Login to View Your Cart</h2>
        <p className="mb-8 text-gray-600">You need to be logged in to access your shopping cart.</p>
        <div className="flex justify-center space-x-4">
          <Link to="/login" className="btn-primary">
            Login
          </Link>
          <Link to="/register" className="btn-outline">
            Register
          </Link>
        </div>
      </div>
    );
  }
  
  if (cartItems.length === 0) {
    return (
      <div className="text-center py-12">
        <FiShoppingBag className="mx-auto h-16 w-16 text-gray-400" />
        <h2 className="text-2xl font-bold mb-4 mt-4">Your Cart is Empty</h2>
        <p className="mb-8 text-gray-600">Add some products to your cart and they will appear here.</p>
        <Link to="/marketplace" className="btn-primary flex items-center justify-center max-w-xs mx-auto">
          <FiArrowLeft className="mr-2" /> Continue Shopping
        </Link>
      </div>
    );
  }
  
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Your Shopping Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="divide-y divide-gray-200">
              {cartItems.map((item) => (
                <div key={item.id} className="p-6 flex flex-col sm:flex-row animate-fade-in">
                  <div className="sm:w-24 sm:h-24 flex-shrink-0 mb-4 sm:mb-0">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-full object-cover rounded-md"
                    />
                  </div>
                  
                  <div className="flex-1 sm:ml-6">
                    <div className="flex flex-col sm:flex-row sm:justify-between mb-4">
                      <div>
                        <Link to={`/product/${item.id}`} className="text-lg font-semibold text-gray-900 hover:text-primary-600">
                          {item.name}
                        </Link>
                        <p className="text-sm text-gray-500 mt-1">{item.category}</p>
                      </div>
                      <div className="text-lg font-semibold text-gray-900 mt-2 sm:mt-0">
                        ${item.price.toFixed(2)}
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                      <div className="flex items-center">
                        <label className="mr-2 text-sm text-gray-700">Qty:</label>
                        <select
                          value={item.quantity}
                          onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                          className="border-gray-300 rounded-md shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-500 focus:ring-opacity-50 text-sm"
                        >
                          {[...Array(10).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </select>
                      </div>
                      
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-600 hover:text-red-800 flex items-center text-sm mt-2 sm:mt-0"
                      >
                        <FiTrash2 className="mr-1" /> Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-6 flex justify-between">
            <Link to="/marketplace" className="btn-outline flex items-center">
              <FiArrowLeft className="mr-2" /> Continue Shopping
            </Link>
            
            <button onClick={clearCart} className="text-red-600 hover:text-red-800">
              Clear Cart
            </button>
          </div>
        </div>
        
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
            
            <div className="border-t border-gray-200 pt-4 pb-2">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Subtotal</span>
                <span className="text-gray-900 font-medium">${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Shipping</span>
                <span className="text-gray-900 font-medium">$0.00</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Taxes</span>
                <span className="text-gray-900 font-medium">$0.00</span>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-4 mt-2">
              <div className="flex justify-between mb-4">
                <span className="text-lg font-semibold">Total</span>
                <span className="text-xl font-semibold text-primary-600">${cartTotal.toFixed(2)}</span>
              </div>
              
              <button
                onClick={handleCheckout}
                disabled={isProcessing}
                className="w-full btn-primary py-3 flex items-center justify-center"
              >
                {isProcessing ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  <>
                    Checkout <FiArrowRight className="ml-2" />
                  </>
                )}
              </button>
              
              <p className="text-xs text-gray-500 mt-4 text-center">
                By proceeding to checkout, you agree to our terms and conditions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;