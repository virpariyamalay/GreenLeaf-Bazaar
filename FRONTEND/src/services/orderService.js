// Get all orders
export const getOrders = () => {
  const orders = JSON.parse(localStorage.getItem('orders') || '[]');
  return orders;
};

// Get orders for a specific seller
export const getSellerOrders = (sellerId) => {
  const allOrders = getOrders();
  return allOrders.filter(order => 
    order.items.some(item => item.sellerId === sellerId)
  );
};

// Get order details
export const getOrderById = (orderId) => {
  const orders = getOrders();
  return orders.find(order => order.id === orderId);
};

// Update order status
export const updateOrderStatus = (orderId, status) => {
  try {
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const orderIndex = orders.findIndex(order => order.id === orderId);
    
    if (orderIndex === -1) {
      return { success: false, error: 'Order not found' };
    }
    
    orders[orderIndex] = {
      ...orders[orderIndex],
      status,
      updatedAt: new Date().toISOString()
    };
    
    localStorage.setItem('orders', JSON.stringify(orders));
    return { success: true, order: orders[orderIndex] };
  } catch (error) {
    console.error('Error updating order:', error);
    return { success: false, error: error.message };
  }
};