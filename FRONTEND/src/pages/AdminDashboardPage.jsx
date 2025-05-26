// import { useState, useEffect } from 'react';
// import { FiCheck, FiXCircle, FiShoppingBag, FiUsers, FiClock } from 'react-icons/fi';
// import { toast } from 'react-toastify';
// import { getPendingProducts, approveProduct, rejectProduct } from '../services/productService';

// const AdminDashboardPage = () => {
//   const [pendingProducts, setPendingProducts] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
  
//   useEffect(() => {
//     const loadPendingProducts = () => {
//       const products = getPendingProducts();
//       setPendingProducts(products);
//       setIsLoading(false);
//     };
    
//     loadPendingProducts();
//   }, []);
  
//   const handleApprove = async (productId) => {
//     try {
//       const result = await approveProduct(productId);
      
//       if (result.success) {
//         setPendingProducts(prevProducts => 
//           prevProducts.filter(product => product.id !== productId)
//         );
//         toast.success('Product approved');
//       } else {
//         toast.error(result.error || 'Failed to approve product');
//       }
//     } catch (error) {
//       toast.error('An error occurred');
//       console.error(error);
//     }
//   };
  
//   const handleReject = async (productId) => {
//     try {
//       const result = await rejectProduct(productId);
      
//       if (result.success) {
//         setPendingProducts(prevProducts => 
//           prevProducts.filter(product => product.id !== productId)
//         );
//         toast.success('Product rejected');
//       } else {
//         toast.error(result.error || 'Failed to reject product');
//       }
//     } catch (error) {
//       toast.error('An error occurred');
//       console.error(error);
//     }
//   };
  
//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-primary-600 border-solid"></div>
//       </div>
//     );
//   }
  
//   return (
//     <div>
//       <h1 className="text-3xl font-bold text-gray-800 mb-8">Admin Dashboard</h1>
      
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//         <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-primary-500">
//           <div className="flex items-center">
//             <div className="p-3 bg-primary-100 rounded-full">
//               <FiShoppingBag className="h-8 w-8 text-primary-700" />
//             </div>
//             <div className="ml-4">
//               <p className="text-sm font-medium text-gray-500">Total Products</p>
//               <p className="text-2xl font-semibold text-gray-900">0</p>
//             </div>
//           </div>
//         </div>
        
//         <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-secondary-500">
//           <div className="flex items-center">
//             <div className="p-3 bg-secondary-100 rounded-full">
//               <FiUsers className="h-8 w-8 text-secondary-700" />
//             </div>
//             <div className="ml-4">
//               <p className="text-sm font-medium text-gray-500">Total Users</p>
//               <p className="text-2xl font-semibold text-gray-900">0</p>
//             </div>
//           </div>
//         </div>
        
//         <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-yellow-500">
//           <div className="flex items-center">
//             <div className="p-3 bg-yellow-100 rounded-full">
//               <FiClock className="h-8 w-8 text-yellow-700" />
//             </div>
//             <div className="ml-4">
//               <p className="text-sm font-medium text-gray-500">Pending Approvals</p>
//               <p className="text-2xl font-semibold text-gray-900">{pendingProducts.length}</p>
//             </div>
//           </div>
//         </div>
//       </div>
      
//       <div className="bg-white rounded-lg shadow-md overflow-hidden">
//         <div className="px-6 py-4 bg-gray-50 border-b">
//           <h2 className="text-xl font-semibold text-gray-800">Products Pending Approval</h2>
//         </div>
        
//         {pendingProducts.length === 0 ? (
//           <div className="p-6 text-center">
//             <p className="text-gray-600">No products waiting for approval.</p>
//           </div>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead>
//                 <tr>
//                   <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Product
//                   </th>
//                   <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Seller
//                   </th>
//                   <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Category
//                   </th>
//                   <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Price
//                   </th>
//                   <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Submitted On
//                   </th>
//                   <th className="px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Actions
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {pendingProducts.map((product) => (
//                   <tr key={product.id} className="hover:bg-gray-50">
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="flex items-center">
//                         <div className="h-10 w-10 flex-shrink-0">
//                           <img className="h-10 w-10 rounded-md object-cover" src={product.image} alt={product.name} />
//                         </div>
//                         <div className="ml-4">
//                           <div className="text-sm font-medium text-gray-900">
//                             {product.name}
//                           </div>
//                           <div className="text-xs text-gray-500 line-clamp-1 max-w-xs">
//                             {product.description}
//                           </div>
//                         </div>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                       {product.sellerName}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                       {product.category}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                       ${product.price.toFixed(2)}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                       {new Date(product.createdAt).toLocaleDateString()}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
//                       <div className="flex justify-center space-x-2">
//                         <button
//                           onClick={() => handleApprove(product.id)}
//                           className="text-green-600 hover:text-green-900 focus:outline-none"
//                         >
//                           <FiCheck className="h-5 w-5" />
//                         </button>
//                         <button
//                           onClick={() => handleReject(product.id)}
//                           className="text-red-600 hover:text-red-900 focus:outline-none"
//                         >
//                           <FiXCircle className="h-5 w-5" />
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AdminDashboardPage;
// import { useState, useEffect } from 'react';
// import { FiCheck, FiXCircle, FiShoppingBag, FiUsers, FiClock } from 'react-icons/fi';
// import { toast } from 'react-toastify';
// import { getPendingProducts, approveProduct, rejectProduct, getProducts } from '../services/productService';
// import { useAuth } from '../contexts/AuthContext';
// import { useNavigate } from 'react-router-dom';

// const AdminDashboardPage = () => {
//   const [pendingProducts, setPendingProducts] = useState([]);
//   const [approvedProducts, setApprovedProducts] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const { currentUser, isAdmin } = useAuth();
//   const navigate = useNavigate();
  
//   useEffect(() => {
//     if (!isAdmin) {
//       toast.error('Unauthorized access');
//       navigate('/');
//       return;
//     }

//     const loadProducts = () => {
//       const pending = getPendingProducts();
//       const approved = getProducts();
//       setPendingProducts(pending);
//       setApprovedProducts(approved);
//       setIsLoading(false);
//     };
    
//     loadProducts();
//   }, [isAdmin, navigate]);
  
//   const handleApprove = async (productId) => {
//     try {
//       const result = await approveProduct(productId);
      
//       if (result.success) {
//         setPendingProducts(prevProducts => 
//           prevProducts.filter(product => product.id !== productId)
//         );
//         setApprovedProducts(prev => [...prev, result.product]);
//         toast.success('Product approved');
//       } else {
//         toast.error(result.error || 'Failed to approve product');
//       }
//     } catch (error) {
//       toast.error('An error occurred');
//       console.error(error);
//     }
//   };
  
//   const handleReject = async (productId) => {
//     try {
//       const result = await rejectProduct(productId);
      
//       if (result.success) {
//         setPendingProducts(prevProducts => 
//           prevProducts.filter(product => product.id !== productId)
//         );
//         toast.success('Product rejected');
//       } else {
//         toast.error(result.error || 'Failed to reject product');
//       }
//     } catch (error) {
//       toast.error('An error occurred');
//       console.error(error);
//     }
//   };
  
//   if (!isAdmin) {
//     return null;
//   }

//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-primary-600 border-solid"></div>
//       </div>
//     );
//   }

//   // Get total users from localStorage
//   const totalUsers = JSON.parse(localStorage.getItem('users') || '[]').length;
  
//   return (
//     <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
//       <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">Admin Dashboard</h1>
      
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//         <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-l-4 border-primary-500">
//           <div className="flex items-center">
//             <div className="p-3 bg-primary-100 dark:bg-primary-900 rounded-full">
//               <FiShoppingBag className="h-8 w-8 text-primary-700 dark:text-primary-300" />
//             </div>
//             <div className="ml-4">
//               <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Products</p>
//               <p className="text-2xl font-semibold text-gray-900 dark:text-white">{approvedProducts.length}</p>
//             </div>
//           </div>
//         </div>
        
//         <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-l-4 border-secondary-500">
//           <div className="flex items-center">
//             <div className="p-3 bg-secondary-100 dark:bg-secondary-900 rounded-full">
//               <FiUsers className="h-8 w-8 text-secondary-700 dark:text-secondary-300" />
//             </div>
//             <div className="ml-4">
//               <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Users</p>
//               <p className="text-2xl font-semibold text-gray-900 dark:text-white">{totalUsers}</p>
//             </div>
//           </div>
//         </div>
        
//         <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-l-4 border-yellow-500">
//           <div className="flex items-center">
//             <div className="p-3 bg-yellow-100 dark:bg-yellow-900 rounded-full">
//               <FiClock className="h-8 w-8 text-yellow-700 dark:text-yellow-300" />
//             </div>
//             <div className="ml-4">
//               <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Pending Approvals</p>
//               <p className="text-2xl font-semibold text-gray-900 dark:text-white">{pendingProducts.length}</p>
//             </div>
//           </div>
//         </div>
//       </div>
      
//       {/* Pending Products Section */}
//       <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden mb-8">
//         <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700 border-b dark:border-gray-600">
//           <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Products Pending Approval</h2>
//         </div>
        
//         {pendingProducts.length === 0 ? (
//           <div className="p-6 text-center">
//             <p className="text-gray-600 dark:text-gray-400">No products waiting for approval.</p>
//           </div>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
//               <thead>
//                 <tr>
//                   <th className="px-6 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
//                     Product
//                   </th>
//                   <th className="px-6 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
//                     Seller
//                   </th>
//                   <th className="px-6 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
//                     Category
//                   </th>
//                   <th className="px-6 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
//                     Price
//                   </th>
//                   <th className="px-6 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
//                     Submitted On
//                   </th>
//                   <th className="px-6 py-3 bg-gray-50 dark:bg-gray-700 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
//                     Actions
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
//                 {pendingProducts.map((product) => (
//                   <tr key={product.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="flex items-center">
//                         <div className="h-10 w-10 flex-shrink-0">
//                           <img className="h-10 w-10 rounded-md object-cover" src={product.image} alt={product.name} />
//                         </div>
//                         <div className="ml-4">
//                           <div className="text-sm font-medium text-gray-900 dark:text-white">
//                             {product.name}
//                           </div>
//                           <div className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1 max-w-xs">
//                             {product.description}
//                           </div>
//                         </div>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
//                       {product.sellerName}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
//                       {product.category}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
//                       ${product.price.toFixed(2)}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
//                       {new Date(product.createdAt).toLocaleDateString()}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
//                       <div className="flex justify-center space-x-2">
//                         <button
//                           onClick={() => handleApprove(product.id)}
//                           className="text-green-600 dark:text-green-400 hover:text-green-900 dark:hover:text-green-300 focus:outline-none"
//                         >
//                           <FiCheck className="h-5 w-5" />
//                         </button>
//                         <button
//                           onClick={() => handleReject(product.id)}
//                           className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300 focus:outline-none"
//                         >
//                           <FiXCircle className="h-5 w-5" />
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>

//       {/* Approved Products Section */}
//       <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden mb-8">
//         <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700 border-b dark:border-gray-600">
//           <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Approved Products</h2>
//         </div>
        
//         {approvedProducts.length === 0 ? (
//           <div className="p-6 text-center">
//             <p className="text-gray-600 dark:text-gray-400">No approved products yet.</p>
//           </div>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
//               <thead>
//                 <tr>
//                   <th className="px-6 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
//                     Product
//                   </th>
//                   <th className="px-6 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
//                     Seller
//                   </th>
//                   <th className="px-6 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
//                     Category
//                   </th>
//                   <th className="px-6 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
//                     Price
//                   </th>
//                   <th className="px-6 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
//                     Status
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
//                 {approvedProducts.map((product) => (
//                   <tr key={product.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="flex items-center">
//                         <div className="h-10 w-10 flex-shrink-0">
//                           <img className="h-10 w-10 rounded-md object-cover" src={product.image} alt={product.name} />
//                         </div>
//                         <div className="ml-4">
//                           <div className="text-sm font-medium text-gray-900 dark:text-white">
//                             {product.name}
//                           </div>
//                           <div className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1 max-w-xs">
//                             {product.description}
//                           </div>
//                         </div>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
//                       {product.sellerName}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
//                       {product.category}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
//                       ${product.price.toFixed(2)}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
//                         Approved
//                       </span>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AdminDashboardPage;
import { useState, useEffect } from 'react';
import { FiCheck, FiXCircle, FiShoppingBag, FiUsers, FiClock } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { getPendingProducts, approveProduct, rejectProduct, getProducts } from '../services/productService';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const AdminDashboardPage = () => {
  const [pendingProducts, setPendingProducts] = useState([]);
  const [approvedProducts, setApprovedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { currentUser, isAdmin } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!isAdmin) {
      toast.error('Unauthorized access');
      navigate('/');
      return;
    }

    const loadProducts = () => {
      const pending = getPendingProducts();
      const approved = getProducts();
      setPendingProducts(pending);
      setApprovedProducts(approved);
      setIsLoading(false);
    };
    
    loadProducts();
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
        toast.success('Product rejected');
      } else {
        toast.error(result.error || 'Failed to reject product');
      }
    } catch (error) {
      toast.error('An error occurred');
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

  // Get total users from localStorage
  const totalUsers = JSON.parse(localStorage.getItem('users') || '[]').length;
  
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-l-4 border-primary-500">
          <div className="flex items-center">
            <div className="p-3 bg-primary-100 dark:bg-primary-900 rounded-full">
              <FiShoppingBag className="h-8 w-8 text-primary-700 dark:text-primary-300" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Products</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">{approvedProducts.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-l-4 border-secondary-500">
          <div className="flex items-center">
            <div className="p-3 bg-secondary-100 dark:bg-secondary-900 rounded-full">
              <FiUsers className="h-8 w-8 text-secondary-700 dark:text-secondary-300" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Users</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">{totalUsers}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-l-4 border-yellow-500">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-100 dark:bg-yellow-900 rounded-full">
              <FiClock className="h-8 w-8 text-yellow-700 dark:text-yellow-300" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Pending Approvals</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">{pendingProducts.length}</p>
            </div>
          </div>
        </div>
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
                    Submitted On
                  </th>
                  <th className="px-6 py-3 bg-gray-50 dark:bg-gray-700 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {pendingProducts.map((product) => (
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
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {new Date(product.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                      <div className="flex justify-center space-x-2">
                        <button
                          onClick={() => handleApprove(product.id)}
                          className="text-green-600 dark:text-green-400 hover:text-green-900 dark:hover:text-green-300 focus:outline-none"
                        >
                          <FiCheck className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleReject(product.id)}
                          className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300 focus:outline-none"
                        >
                          <FiXCircle className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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