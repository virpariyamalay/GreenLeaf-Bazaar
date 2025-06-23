import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiCheck, FiXCircle, FiClock, FiShoppingBag, FiTrash2, FiUser, FiMapPin, FiPhone, FiMail } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { getPendingProducts, approveProduct, rejectProduct, getProducts, deleteProduct } from '../services/productService';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const AdminDashboardPage = () => {
  const [pendingProducts, setPendingProducts] = useState([]);
  const [approvedProducts, setApprovedProducts] = useState([]);
  const [rejectedProducts, setRejectedProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { currentUser, isAdmin } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!isAdmin) {
      toast.error('Unauthorized access');
      navigate('/');
      return;
    }

    const loadData = () => {
      // Load products
      const pending = getPendingProducts();
      const approved = getProducts().filter(p => p.status === 'approved');
      const rejected = getProducts().filter(p => p.status === 'rejected');
      
      // Load orders
      const allOrders = JSON.parse(localStorage.getItem('orders') || '[]');
      
      setPendingProducts(pending);
      setApprovedProducts(approved);
      setRejectedProducts(rejected);
      setOrders(allOrders);
      setIsLoading(false);
    };
    
    loadData();
  }, [isAdmin, navigate]);
  
  const handleApprove = async (productId) => {
    try {
      const result = await approveProduct(productId);
      
      if (result.success) {
        setPendingProducts(prevProducts => 
          prevProducts.filter(product => product.id !== productId)
        );
        setApprovedProducts(prev => [...prev, result.product]);
        toast.success('Product approved');
      } else {
        toast.error(result.error || 'Failed to approve product');
      }
    } catch (error) {
      toast.error('An error occurred');
      console.error(error);
    }
  };
  
  const handleReject = async (productId) => {
    try {
      const result = await rejectProduct(productId);
      
      if (result.success) {
        setPendingProducts(prevProducts => 
          prevProducts.filter(product => product.id !== productId)
        );
        setRejectedProducts(prev => [...prev, { ...result.product, status: 'rejected' }]);
        toast.success('Product rejected');
      } else {
        toast.error(result.error || 'Failed to reject product');
      }
    } catch (error) {
      toast.error('An error occurred');
      console.error(error);
    }
  };

  const handleDeleteApprovedProduct = async (productId) => {
    if (window.confirm('Are you sure you want to delete this approved product?')) {
      try {
        const result = await deleteProduct(productId);
        
        if (result.success) {
          setApprovedProducts(prev => prev.filter(product => product.id !== productId));
          toast.success('Product deleted successfully');
        } else {
          toast.error(result.error || 'Failed to delete product');
        }
      } catch (error) {
        toast.error('An error occurred');
        console.error(error);
      }
    }
  };

  const handleDeleteRejectedProduct = (productId) => {
    if (window.confirm('Are you sure you want to delete this rejected product?')) {
      try {
        const rejectedProducts = JSON.parse(localStorage.getItem('rejectedProducts') || '[]');
        const updatedRejectedProducts = rejectedProducts.filter(product => product.id !== productId);
        localStorage.setItem('rejectedProducts', JSON.stringify(updatedRejectedProducts));
        
        setRejectedProducts(updatedRejectedProducts);
        toast.success('Rejected product deleted successfully');
      } catch (error) {
        toast.error('Failed to delete rejected product');
        console.error(error);
      }
    }
  };

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

  if (!isAdmin) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-primary-600 border-solid"></div>
      </div>
    );
  }
  
  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Admin Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage products and monitor orders
          </p>
        </div>
        <Link to="/admin/orders" className="btn-primary mt-4 md:mt-0">
          View All Orders
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-l-4 border-yellow-500">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-100 dark:bg-yellow-900 rounded-full">
              <FiClock className="h-8 w-8 text-yellow-700 dark:text-yellow-300" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Pending</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">{pendingProducts.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-l-4 border-green-500">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 dark:bg-green-900 rounded-full">
              <FiCheck className="h-8 w-8 text-green-700 dark:text-green-300" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Approved</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">{approvedProducts.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-l-4 border-red-500">
          <div className="flex items-center">
            <div className="p-3 bg-red-100 dark:bg-red-900 rounded-full">
              <FiXCircle className="h-8 w-8 text-red-700 dark:text-red-300" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Rejected</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">{rejectedProducts.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-l-4 border-blue-500">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
              <FiShoppingBag className="h-8 w-8 text-blue-700 dark:text-blue-300" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Orders</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">{orders.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders Preview */}
      <div className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Recent Orders</h2>
          <Link to="/admin/orders" className="text-primary-600 hover:text-primary-700">
            View All Orders
          </Link>
        </div>
        
        {orders.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow text-center">
            <p className="text-gray-600 dark:text-gray-400">No orders yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {orders.slice(0, 3).map((order) => (
              <div key={order.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-sm text-gray-500">Order #{order.id.slice(-6)}</span>
                    <h3 className="font-semibold text-lg text-gray-900 dark:text-white mt-1">
                      {order.userName}
                    </h3>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    order.status === 'completed' ? 'bg-green-100 text-green-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  {order.items.length} items • ${order.total.toFixed(2)}
                </div>
                <div className="text-xs text-gray-500">
                  {new Date(order.createdAt).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Pending Products Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden mb-8">
        <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700 border-b dark:border-gray-600">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Products Pending Approval</h2>
        </div>
        
        {pendingProducts.length === 0 ? (
          <div className="p-6 text-center">
            <p className="text-gray-600 dark:text-gray-400">No products waiting for approval.</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {pendingProducts.map((product) => (
              <div key={product.id} className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="h-20 w-20 flex-shrink-0">
                      <img 
                        className="h-20 w-20 rounded-lg object-cover" 
                        src={product.image} 
                        alt={product.name} 
                      />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                        {product.name}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {product.description}
                      </p>
                      <div className="mt-2 flex items-center space-x-4">
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          Category: {product.category}
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          Price: ${product.price.toFixed(2)}
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          Stock: {product.stock}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-3">
                    <button
                      onClick={() => handleApprove(product.id)}
                      className="text-green-600 hover:text-green-800 p-2"
                      title="Approve"
                    >
                      <FiCheck className="h-6 w-6" />
                    </button>
                    <button
                      onClick={() => handleReject(product.id)}
                      className="text-red-600 hover:text-red-800 p-2"
                      title="Reject"
                    >
                      <FiXCircle className="h-6 w-6" />
                    </button>
                  </div>
                </div>

                {/* Product Information */}
                <div className="mt-6 bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <h4 className="font-semibold mb-3 text-gray-900 dark:text-white">Product Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm"><span className="font-medium">Section:</span> {product.section}</p>
                      <p className="text-sm"><span className="font-medium">Category:</span> {product.category}</p>
                      <p className="text-sm"><span className="font-medium">Price:</span> ${product.price.toFixed(2)}</p>
                      <p className="text-sm"><span className="font-medium">Stock:</span> {product.stock} units</p>
                    </div>
                    <div>
                      <p className="text-sm"><span className="font-medium">Sustainable:</span> {product.isSustainable ? 'Yes' : 'No'}</p>
                      {product.isSustainable && (
                        <p className="text-sm"><span className="font-medium">Sustainability Info:</span> {product.sustainabilityInfo}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Seller Information */}
                <div className="mt-4 bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <h4 className="font-semibold mb-3 text-gray-900 dark:text-white">Seller Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <FiUser className="text-gray-500 mr-2" />
                        <p className="text-sm">
                          <span className="font-medium">Business Name:</span> {product.businessName}
                        </p>
                      </div>
                      <div className="flex items-center">
                        <FiUser className="text-gray-500 mr-2" />
                        <p className="text-sm">
                          <span className="font-medium">Contact Person:</span> {product.contactName}
                        </p>
                      </div>
                      <div className="flex items-center">
                        <FiMail className="text-gray-500 mr-2" />
                        <p className="text-sm">
                          <span className="font-medium">Email:</span> {product.contactEmail}
                        </p>
                      </div>
                      <div className="flex items-center">
                        <FiPhone className="text-gray-500 mr-2" />
                        <p className="text-sm">
                          <span className="font-medium">Phone:</span> {product.contactPhone}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm">
                        <span className="font-medium">GST Number:</span> {product.gstNumber}
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">PAN Card:</span> {product.panCard}
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">Aadhar Card:</span> {product.aadharCard}
                      </p>
                      <div className="flex items-start">
                        <FiMapPin className="text-gray-500 mr-2 mt-1" />
                        <p className="text-sm">
                          <span className="font-medium">Address:</span> {product.address}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Approved Products Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden mb-8">
        <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700 border-b dark:border-gray-600">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Approved Products</h2>
        </div>
        
        {approvedProducts.length === 0 ? (
          <div className="p-6 text-center">
            <p className="text-gray-600 dark:text-gray-400">No approved products yet.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead>
                <tr>
                  <th className="px-6 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Seller
                  </th>
                  <th className="px-6 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 bg-gray-50 dark:bg-gray-700 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {approvedProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0">
                          <img className="h-10 w-10 rounded-md object-cover" src={product.image} alt={product.name} />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {product.name}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1 max-w-xs">
                            {product.description}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {product.sellerName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {product.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      ${product.price.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                        Approved
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                      <button
                        onClick={() => handleDeleteApprovedProduct(product.id)}
                        className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300 focus:outline-none"
                        title="Delete Product"
                      >
                        <FiTrash2 className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Rejected Products Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700 border-b dark:border-gray-600">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Rejected Products</h2>
        </div>
        
        {rejectedProducts.length === 0 ? (
          <div className="p-6 text-center">
            <p className="text-gray-600 dark:text-gray-400">No rejected products.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead>
                <tr>
                  <th className="px-6 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Seller
                  </th>
                  <th className="px-6 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 bg-gray-50 dark:bg-gray-700 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {rejectedProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0">
                          <img className="h-10 w-10 rounded-md object-cover" src={product.image} alt={product.name} />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {product.name}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1 max-w-xs">
                            {product.description}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {product.sellerName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {product.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      ${product.price.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                        Rejected
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                      <button
                        onClick={() => handleDeleteRejectedProduct(product.id)}
                        className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300 focus:outline-none"
                        title="Delete Product"
                      >
                        <FiTrash2 className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboardPage;