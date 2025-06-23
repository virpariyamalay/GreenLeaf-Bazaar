import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import CartItemsSection from '../components/cart/CartItemsSection';
import OrderSummarySection from '../components/cart/OrderSummarySection';
import EmptyCartSection from '../components/cart/EmptyCartSection';
import LoginPromptSection from '../components/cart/LoginPromptSection';
import CheckoutFormSection from '../components/cart/CheckoutFormSection';
import OrderConfirmationSection from '../components/cart/OrderConfirmationSection';

const CartPage = () => {
  const { cartItems, cartTotal, updateQuantity, removeFromCart, clearCart, checkout } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [showOrderSummary, setShowOrderSummary] = useState(false);
  const [deliveryDetails, setDeliveryDetails] = useState(null);

  const handleCheckout = () => {
    if (!isAuthenticated) {
      toast.error('Please login to checkout');
      navigate('/login');
      return;
    }

    if (cartItems.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    setShowCheckoutForm(true);
  };

  const handleDeliverySubmit = async (formData) => {
    setIsProcessing(true);

    try {
      const result = await checkout(formData);

      if (result.success) {
        setDeliveryDetails(formData);
        setShowCheckoutForm(false);
        setShowOrderSummary(true);
      }
    } catch (error) {
      toast.error('An error occurred during checkout');
      console.error(error);
    } finally {
      setIsProcessing(false);
    }
  };

  if (!isAuthenticated) return <LoginPromptSection />;
  if (showOrderSummary) return <OrderConfirmationSection cartItems={cartItems} cartTotal={cartTotal} deliveryDetails={deliveryDetails} />;
  if (showCheckoutForm) return <CheckoutFormSection cartItems={cartItems} cartTotal={cartTotal} onSubmit={handleDeliverySubmit} onBack={() => setShowCheckoutForm(false)} />;
  if (cartItems.length === 0) return <EmptyCartSection />;

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Your Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <CartItemsSection cartItems={cartItems} updateQuantity={updateQuantity} removeFromCart={removeFromCart} clearCart={clearCart} />
        </div>

        <div className="lg:col-span-1">
          <OrderSummarySection cartTotal={cartTotal} handleCheckout={handleCheckout} isProcessing={isProcessing} />
        </div>
      </div>
    </div>
  );
};

export default CartPage;