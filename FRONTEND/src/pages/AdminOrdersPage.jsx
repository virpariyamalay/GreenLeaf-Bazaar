import { useState, useEffect } from 'react';
import { FiTrash2, FiUser, FiPhone, FiMail, FiMapPin, FiPackage } from 'react-icons/fi';
import { toast } from 'react-toastify';

const AdminOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadOrders = () => {
      const allOrders = JSON.parse(localStorage.getItem('orders') || '[]');
      setOrders(allOrders);
      setIsLoading(false);
    };
    
    loadOrders();
  }, []);

  const handleDeleteOrder = (orderId) => {
    try {
      const updatedOrders = orders.filter(order => order.id !== orderId);
      localStorage.setItem('orders', JSON.stringify(updatedOrders));
      setOrders(updatedOrders);
      toast.success('Order deleted successfully');
    } catch (error) {
      toast.error('Failed to delete order');
      console.error(error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-primary-600 border-solid"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Order Management</h1>
      
      {orders.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow text-center">
          <p className="text-gray-600 dark:text-gray-400">No orders yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
              {/* Order Header */}
              <div className="bg-gray-50 dark:bg-gray-700 px-6 py-4 border-b border-gray-200 dark:border-gray-600">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-semibold">Order #{order.id.slice(-6)}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Placed on {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    order.status === 'completed' ? 'bg-green-100 text-green-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </div>
              </div>

              <div className="p-6">
                {/* Customer Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-500 mb-3">Customer Details</h4>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <FiUser className="text-gray-400 mr-2" />
                        <span>{order.deliveryDetails.fullName}</span>
                      </div>
                      <div className="flex items-center">
                        <FiPhone className="text-gray-400 mr-2" />
                        <span>{order.deliveryDetails.phone}</span>
                      </div>
                      <div className="flex items-center">
                        <FiMail className="text-gray-400 mr-2" />
                        <span>{order.userEmail}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-semibold text-gray-500 mb-3">Shipping Address</h4>
                    <div className="flex items-start">
                      <FiMapPin className="text-gray-400 mr-2 mt-1" />
                      <span>{order.deliveryDetails.address}</span>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-500 mb-3">Order Items</h4>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg">
                    {order.items.map((item, index) => (
                      <div 
                        key={item.id}
                        className={`flex items-center py-4 px-4 ${
                          index !== order.items.length - 1 ? 'border-b border-gray-200 dark:border-gray-600' : ''
                        }`}
                      >
                        <div className="h-16 w-16 flex-shrink-0">
                          <img 
                            src={item.image} 
                            alt={item.name}
                            className="h-full w-full object-cover rounded"
                          />
                        </div>
                        <div className="ml-4 flex-1">
                          <h5 className="font-medium">{item.name}</h5>
                          <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                          <p className="text-sm text-gray-500">${item.price.toFixed(2)} each</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Order Summary */}
                <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Subtotal</span>
                    <span>${order.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Tax (18%)</span>
                    <span>${order.tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span className="text-primary-600">${order.total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-6 flex justify-end">
                  <button
                    onClick={() => handleDeleteOrder(order.id)}
                    className="flex items-center text-red-600 hover:text-red-800"
                  >
                    <FiTrash2 className="mr-2" />
                    Delete Order
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminOrdersPage;