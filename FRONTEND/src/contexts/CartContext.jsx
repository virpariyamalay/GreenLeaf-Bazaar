// import { createContext, useContext, useState, useCallback, useEffect } from 'react';
// import { toast } from 'react-toastify';
// import { useAuth } from './AuthContext';

// const CartContext = createContext();

// export const useCart = () => useContext(CartContext);

// export const CartProvider = ({ children }) => {
//   const [cartItems, setCartItems] = useState([]);
//   const [cartCount, setCartCount] = useState(0);
//   const [cartTotal, setCartTotal] = useState(0);
//   const { currentUser, isAuthenticated } = useAuth();

//   // Load cart from localStorage on component mount and when user changes
//   useEffect(() => {
//     if (isAuthenticated && currentUser) {
//       const userCart = JSON.parse(localStorage.getItem(`cart_${currentUser.id}`) || '[]');
//       setCartItems(userCart);
//     } else {
//       setCartItems([]);
//     }
//   }, [currentUser, isAuthenticated]);

//   // Update cart count and total when items change
//   useEffect(() => {
//     const count = cartItems.reduce((total, item) => total + item.quantity, 0);
//     const price = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    
//     setCartCount(count);
//     setCartTotal(price);
    
//     // Save to localStorage when cart changes
//     if (isAuthenticated && currentUser) {
//       localStorage.setItem(`cart_${currentUser.id}`, JSON.stringify(cartItems));
//     }
//   }, [cartItems, currentUser, isAuthenticated]);

//   // Add item to cart
//   const addToCart = useCallback((product, quantity = 1) => {
//     if (!isAuthenticated) {
//       toast.error('Please login to add items to your cart');
//       return;
//     }
    
//     setCartItems(prevItems => {
//       const existingItemIndex = prevItems.findIndex(item => item.id === product.id);
      
//       if (existingItemIndex !== -1) {
//         // Item already in cart, update quantity
//         const updatedItems = [...prevItems];
//         updatedItems[existingItemIndex] = {
//           ...updatedItems[existingItemIndex],
//           quantity: updatedItems[existingItemIndex].quantity + quantity
//         };
//         return updatedItems;
//       } else {
//         // Add new item to cart
//         return [...prevItems, { ...product, quantity }];
//       }
//     });
    
//     toast.success('Item added to cart!');
//   }, [isAuthenticated]);

//   // Update item quantity
//   const updateQuantity = useCallback((productId, quantity) => {
//     if (quantity <= 0) {
//       removeFromCart(productId);
//       return;
//     }
    
//     setCartItems(prevItems =>
//       prevItems.map(item =>
//         item.id === productId ? { ...item, quantity } : item
//       )
//     );
//   }, []);

//   // Remove item from cart
//   const removeFromCart = useCallback((productId) => {
//     setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
//     toast.info('Item removed from cart');
//   }, []);

//   // Clear cart
//   const clearCart = useCallback(() => {
//     setCartItems([]);
//     toast.info('Cart has been cleared');
//   }, []);

//   // Create order from cart
//   const checkout = useCallback(() => {
//     if (!isAuthenticated) {
//       toast.error('Please login to checkout');
//       return { success: false };
//     }
    
//     if (cartItems.length === 0) {
//       toast.error('Your cart is empty');
//       return { success: false };
//     }
    
//     try {
//       // Get existing orders from localStorage
//       const orders = JSON.parse(localStorage.getItem('orders') || '[]');
      
//       // Create new order
//       const newOrder = {
//         id: Date.now().toString(),
//         userId: currentUser.id,
//         items: [...cartItems],
//         total: cartTotal,
//         status: 'pending',
//         createdAt: new Date().toISOString()
//       };
      
//       // Save order to localStorage
//       orders.push(newOrder);
//       localStorage.setItem('orders', JSON.stringify(orders));
      
//       // Clear cart after successful order
//       clearCart();
      
//       toast.success('Order placed successfully!');
//       return { success: true, orderId: newOrder.id };
//     } catch (error) {
//       toast.error('Failed to place order');
//       return { success: false, error: error.message };
//     }
//   }, [cartItems, cartTotal, clearCart, currentUser, isAuthenticated]);

//   const value = {
//     cartItems,
//     cartCount,
//     cartTotal,
//     addToCart,
//     updateQuantity,
//     removeFromCart,
//     clearCart,
//     checkout
//   };

//   return (
//     <CartContext.Provider value={value}>
//       {children}
//     </CartContext.Provider>
//   );
// };

import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);
  const { currentUser, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated && currentUser) {
      const userCart = JSON.parse(localStorage.getItem(`cart_${currentUser.id}`) || '[]');
      setCartItems(userCart);
    } else {
      setCartItems([]);
    }
  }, [currentUser, isAuthenticated]);

  useEffect(() => {
    const count = cartItems.reduce((total, item) => total + item.quantity, 0);
    const price = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    
    setCartCount(count);
    setCartTotal(price);
    
    if (isAuthenticated && currentUser) {
      localStorage.setItem(`cart_${currentUser.id}`, JSON.stringify(cartItems));
    }
  }, [cartItems, currentUser, isAuthenticated]);

  const addToCart = useCallback((product, quantity = 1) => {
    if (!isAuthenticated) {
      toast.error('Please login to add items to your cart');
      return;
    }
    
    setCartItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(item => item.id === product.id);
      
      if (existingItemIndex !== -1) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + quantity
        };
        return updatedItems;
      } else {
        return [...prevItems, { ...product, quantity }];
      }
    });
    
    toast.success('Item added to cart!');
  }, [isAuthenticated]);

  const updateQuantity = useCallback((productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  }, []);

  const removeFromCart = useCallback((productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
    toast.info('Item removed from cart');
  }, []);

  const clearCart = useCallback(() => {
    setCartItems([]);
    toast.info('Cart has been cleared');
  }, []);

  const checkout = useCallback((deliveryDetails) => {
    if (!isAuthenticated) {
      toast.error('Please login to checkout');
      return { success: false };
    }
    
    if (cartItems.length === 0) {
      toast.error('Your cart is empty');
      return { success: false };
    }
    
    try {
      const orders = JSON.parse(localStorage.getItem('orders') || '[]');
      
      const tax = cartTotal * 0.18;
      const totalAmount = cartTotal + tax;

      const newOrder = {
        id: Date.now().toString(),
        userId: currentUser.id,
        userName: currentUser.name || currentUser.username,
        userEmail: currentUser.email,
        items: [...cartItems],
        subtotal: cartTotal,
        tax: tax,
        total: totalAmount,
        status: 'pending',
        createdAt: new Date().toISOString(),
        deliveryDetails: {
          ...deliveryDetails,
          address: `${deliveryDetails.address}, ${deliveryDetails.city}, ${deliveryDetails.state} - ${deliveryDetails.pincode}`
        }
      };
      
      orders.push(newOrder);
      localStorage.setItem('orders', JSON.stringify(orders));
      
      clearCart();
      
      toast.success('Order placed successfully!');
      return { success: true, orderId: newOrder.id };
    } catch (error) {
      toast.error('Failed to place order');
      return { success: false, error: error.message };
    }
  }, [cartItems, cartTotal, clearCart, currentUser, isAuthenticated]);

  const value = {
    cartItems,
    cartCount,
    cartTotal,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    checkout
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};