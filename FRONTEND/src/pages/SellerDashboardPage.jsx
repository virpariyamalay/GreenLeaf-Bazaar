

// import { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { FiPlus, FiClock, FiCheck, FiXCircle } from 'react-icons/fi';
// import { useAuth } from '../contexts/AuthContext';
// import { getSellerProducts } from '../services/productService';

// const SellerDashboardPage = () => {
//   const { currentUser } = useAuth();
//   const [products, setProducts] = useState({
//     approved: [],
//     pending: [],
//     rejected: []
//   });
//   const [isLoading, setIsLoading] = useState(true);
  
//   useEffect(() => {
//     const loadProducts = () => {
//       if (currentUser) {
//         const sellerProducts = getSellerProducts(currentUser.id);
//         setProducts({
//           approved: sellerProducts.approved,
//           pending: sellerProducts.pending,
//           rejected: sellerProducts.rejected || []
//         });
//         setIsLoading(false);
//       }
//     };
    
//     loadProducts();
//   }, [currentUser]);
  
//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-primary-600 border-solid"></div>
//       </div>
//     );
//   }
  
//   return (
//     <div>
//       <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
//         <div>
//           <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Seller Dashboard</h1>
//           <p className="text-gray-600 dark:text-gray-400">
//             Manage your products and track sales
//           </p>
//         </div>
        
//         <Link to="/seller/add-product" className="btn-primary mt-4 md:mt-0 flex items-center">
//           <FiPlus className="mr-2" /> Add New Product
//         </Link>
//       </div>
      
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//         <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-l-4 border-yellow-500">
//           <div className="flex items-center">
//             <div className="p-3 bg-yellow-100 dark:bg-yellow-900 rounded-full">
//               <FiClock className="h-8 w-8 text-yellow-700 dark:text-yellow-300" />
//             </div>
//             <div className="ml-4">
//               <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Pending</p>
//               <p className="text-2xl font-semibold text-gray-900 dark:text-white">{products.pending.length}</p>
//             </div>
//           </div>
//         </div>
        
//         <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-l-4 border-green-500">
//           <div className="flex items-center">
//             <div className="p-3 bg-green-100 dark:bg-green-900 rounded-full">
//               <FiCheck className="h-8 w-8 text-green-700 dark:text-green-300" />
//             </div>
//             <div className="ml-4">
//               <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Approved</p>
//               <p className="text-2xl font-semibold text-gray-900 dark:text-white">{products.approved.length}</p>
//             </div>
//           </div>
//         </div>
        
//         <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-l-4 border-red-500">
//           <div className="flex items-center">
//             <div className="p-3 bg-red-100 dark:bg-red-900 rounded-full">
//               <FiXCircle className="h-8 w-8 text-red-700 dark:text-red-300" />
//             </div>
//             <div className="ml-4">
//               <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Rejected</p>
//               <p className="text-2xl font-semibold text-gray-900 dark:text-white">{products.rejected.length}</p>
//             </div>
//           </div>
//         </div>
//       </div>
      
//       {/* Active Products */}
//       <div className="mb-12">
//         <h2 className="text-xl font-semibold mb-4 flex items-center text-gray-800 dark:text-white">
//           <FiCheck className="text-green-600 mr-2" /> 
//           Approved Products
//         </h2>
        
//         {products.approved.length === 0 ? (
//           <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow text-center">
//             <p className="text-gray-600 dark:text-gray-400 mb-4">You don't have any approved products yet.</p>
//             <Link to="/seller/add-product" className="btn-primary inline-flex items-center">
//               <FiPlus className="mr-2" /> Add Product
//             </Link>
//           </div>
//         ) : (
//           <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow">
//             <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
//               <thead>
//                 <tr>
//                   <th className="px-6 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
//                     Product
//                   </th>
//                   <th className="px-6 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
//                     Category
//                   </th>
//                   <th className="px-6 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
//                     Price
//                   </th>
//                   <th className="px-6 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
//                     Stock
//                   </th>
//                   <th className="px-6 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
//                     Status
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
//                 {products.approved.map((product) => (
//                   <tr key={product.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="flex items-center">
//                         <div className="h-10 w-10 flex-shrink-0">
//                           <img className="h-10 w-10 rounded-md object-cover" src={product.image} alt="" />
//                         </div>
//                         <div className="ml-4">
//                           <Link to={`/product/${product.id}`} className="text-sm font-medium text-gray-900 dark:text-white hover:text-primary-600">
//                             {product.name}
//                           </Link>
//                         </div>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
//                       {product.category}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
//                       ${product.price.toFixed(2)}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
//                       {product.stock}
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
      
//       {/* Pending Products */}
//       <div className="mb-12">
//         <h2 className="text-xl font-semibold mb-4 flex items-center text-gray-800 dark:text-white">
//           <FiClock className="text-yellow-600 mr-2" /> 
//           Pending Products
//         </h2>
        
//         {products.pending.length === 0 ? (
//           <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow text-center">
//             <p className="text-gray-600 dark:text-gray-400">No products waiting for approval.</p>
//           </div>
//         ) : (
//           <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow">
//             <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
//               <thead>
//                 <tr>
//                   <th className="px-6 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
//                     Product
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
//                   <th className="px-6 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
//                     Status
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
//                 {products.pending.map((product) => (
//                   <tr key={product.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="flex items-center">
//                         <div className="h-10 w-10 flex-shrink-0">
//                           <img className="h-10 w-10 rounded-md object-cover" src={product.image} alt="" />
//                         </div>
//                         <div className="ml-4">
//                           <div className="text-sm font-medium text-gray-900 dark:text-white">
//                             {product.name}
//                           </div>
//                         </div>
//                       </div>
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
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
//                         Pending
//                       </span>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>

//       {/* Rejected Products */}
//       <div>
//         <h2 className="text-xl font-semibold mb-4 flex items-center text-gray-800 dark:text-white">
//           <FiXCircle className="text-red-600 mr-2" /> 
//           Rejected Products
//         </h2>
        
//         {products.rejected.length === 0 ? (
//           <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow text-center">
//             <p className="text-gray-600 dark:text-gray-400">No rejected products.</p>
//           </div>
//         ) : (
//           <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow">
//             <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
//               <thead>
//                 <tr>
//                   <th className="px-6 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
//                     Product
//                   </th>
//                   <th className="px-6 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
//                     Category
//                   </th>
//                   <th className="px-6 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
//                     Price
//                   </th>
//                   <th className="px-6 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
//                     Rejected On
//                   </th>
//                   <th className="px-6 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
//                     Status
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
//                 {products.rejected.map((product) => (
//                   <tr key={product.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="flex items-center">
//                         <div className="h-10 w-10 flex-shrink-0">
//                           <img className="h-10 w-10 rounded-md object-cover" src={product.image} alt="" />
//                         </div>
//                         <div className="ml-4">
//                           <div className="text-sm font-medium text-gray-900 dark:text-white">
//                             {product.name}
//                           </div>
//                         </div>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
//                       {product.category}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
//                       ${product.price.toFixed(2)}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
//                       {new Date(product.updatedAt || product.createdAt).toLocaleDateString()}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
//                         Rejected
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

// export default SellerDashboardPage;



// import { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { FiPlus, FiClock, FiCheck, FiXCircle } from 'react-icons/fi';
// import { useAuth } from '../contexts/AuthContext';
// import { getSellerProducts } from '../services/productService';

// const SellerDashboardPage = () => {
//   const { currentUser } = useAuth();
//   const [products, setProducts] = useState({
//     approved: [],
//     pending: [],
//     rejected: []
//   });
//   const [isLoading, setIsLoading] = useState(true);
  
//   useEffect(() => {
//     const loadProducts = () => {
//       if (currentUser) {
//         const sellerProducts = getSellerProducts(currentUser.id);
//         setProducts({
//           approved: sellerProducts.approved,
//           pending: sellerProducts.pending,
//           rejected: sellerProducts.rejected || []
//         });
//         setIsLoading(false);
//       }
//     };
    
//     loadProducts();
//   }, [currentUser]);
  
//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-primary-600 border-solid"></div>
//       </div>
//     );
//   }
  
//   return (
//     <div>
//       <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
//         <div>
//           <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Seller Dashboard</h1>
//           <p className="text-gray-600 dark:text-gray-400">
//             Manage your products and track sales
//           </p>
//         </div>
        
//         <Link to="/seller/add-product" className="btn-primary mt-4 md:mt-0 flex items-center">
//           <FiPlus className="mr-2" /> Add New Product
//         </Link>
//       </div>
      
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//         <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-l-4 border-yellow-500">
//           <div className="flex items-center">
//             <div className="p-3 bg-yellow-100 dark:bg-yellow-900 rounded-full">
//               <FiClock className="h-8 w-8 text-yellow-700 dark:text-yellow-300" />
//             </div>
//             <div className="ml-4">
//               <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Pending</p>
//               <p className="text-2xl font-semibold text-gray-900 dark:text-white">{products.pending.length}</p>
//             </div>
//           </div>
//         </div>
        
//         <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-l-4 border-green-500">
//           <div className="flex items-center">
//             <div className="p-3 bg-green-100 dark:bg-green-900 rounded-full">
//               <FiCheck className="h-8 w-8 text-green-700 dark:text-green-300" />
//             </div>
//             <div className="ml-4">
//               <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Approved</p>
//               <p className="text-2xl font-semibold text-gray-900 dark:text-white">{products.approved.length}</p>
//             </div>
//           </div>
//         </div>
        
//         <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-l-4 border-red-500">
//           <div className="flex items-center">
//             <div className="p-3 bg-red-100 dark:bg-red-900 rounded-full">
//               <FiXCircle className="h-8 w-8 text-red-700 dark:text-red-300" />
//             </div>
//             <div className="ml-4">
//               <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Rejected</p>
//               <p className="text-2xl font-semibold text-gray-900 dark:text-white">{products.rejected.length}</p>
//             </div>
//           </div>
//         </div>
//       </div>
      
//       {/* Active Products */}
//       <div className="mb-12">
//         <h2 className="text-xl font-semibold mb-4 flex items-center text-gray-800 dark:text-white">
//           <FiCheck className="text-green-600 mr-2" /> 
//           Approved Products
//         </h2>
        
//         {products.approved.length === 0 ? (
//           <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow text-center">
//             <p className="text-gray-600 dark:text-gray-400 mb-4">You don't have any approved products yet.</p>
//             <Link to="/seller/add-product" className="btn-primary inline-flex items-center">
//               <FiPlus className="mr-2" /> Add Product
//             </Link>
//           </div>
//         ) : (
//           <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow">
//             <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
//               <thead>
//                 <tr>
//                   <th className="px-6 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
//                     Product
//                   </th>
//                   <th className="px-6 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
//                     Category
//                   </th>
//                   <th className="px-6 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
//                     Price
//                   </th>
//                   <th className="px-6 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
//                     Stock
//                   </th>
//                   <th className="px-6 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
//                     Status
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
//                 {products.approved.map((product) => (
//                   <tr key={product.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="flex items-center">
//                         <div className="h-10 w-10 flex-shrink-0">
//                           <img className="h-10 w-10 rounded-md object-cover" src={product.image} alt="" />
//                         </div>
//                         <div className="ml-4">
//                           <Link to={`/product/${product.id}`} className="text-sm font-medium text-gray-900 dark:text-white hover:text-primary-600">
//                             {product.name}
//                           </Link>
//                         </div>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
//                       {product.category}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
//                       ${product.price.toFixed(2)}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
//                       {product.stock}
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
      
//       {/* Pending Products */}
//       <div className="mb-12">
//         <h2 className="text-xl font-semibold mb-4 flex items-center text-gray-800 dark:text-white">
//           <FiClock className="text-yellow-600 mr-2" /> 
//           Pending Products
//         </h2>
        
//         {products.pending.length === 0 ? (
//           <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow text-center">
//             <p className="text-gray-600 dark:text-gray-400">No products waiting for approval.</p>
//           </div>
//         ) : (
//           <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow">
//             <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
//               <thead>
//                 <tr>
//                   <th className="px-6 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
//                     Product
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
//                   <th className="px-6 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
//                     Status
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
//                 {products.pending.map((product) => (
//                   <tr key={product.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="flex items-center">
//                         <div className="h-10 w-10 flex-shrink-0">
//                           <img className="h-10 w-10 rounded-md object-cover" src={product.image} alt="" />
//                         </div>
//                         <div className="ml-4">
//                           <div className="text-sm font-medium text-gray-900 dark:text-white">
//                             {product.name}
//                           </div>
//                         </div>
//                       </div>
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
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
//                         Pending
//                       </span>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>

//       {/* Rejected Products */}
//       <div>
//         <h2 className="text-xl font-semibold mb-4 flex items-center text-gray-800 dark:text-white">
//           <FiXCircle className="text-red-600 mr-2" /> 
//           Rejected Products
//         </h2>
        
//         {products.rejected.length === 0 ? (
//           <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow text-center">
//             <p className="text-gray-600 dark:text-gray-400">No rejected products.</p>
//           </div>
//         ) : (
//           <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow">
//             <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
//               <thead>
//                 <tr>
//                   <th className="px-6 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
//                     Product
//                   </th>
//                   <th className="px-6 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
//                     Category
//                   </th>
//                   <th className="px-6 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
//                     Price
//                   </th>
//                   <th className="px-6 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
//                     Rejected On
//                   </th>
//                   <th className="px-6 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
//                     Status
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
//                 {products.rejected.map((product) => (
//                   <tr key={product.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="flex items-center">
//                         <div className="h-10 w-10 flex-shrink-0">
//                           <img className="h-10 w-10 rounded-md object-cover" src={product.image} alt="" />
//                         </div>
//                         <div className="ml-4">
//                           <div className="text-sm font-medium text-gray-900 dark:text-white">
//                             {product.name}
//                           </div>
//                         </div>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
//                       {product.category}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
//                       ${product.price.toFixed(2)}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
//                       {new Date(product.updatedAt || product.createdAt).toLocaleDateString()}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
//                         Rejected
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

// export default SellerDashboardPage;

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiClock, FiCheck, FiXCircle, FiPackage, FiDollarSign } from 'react-icons/fi';
import { useAuth } from '../contexts/AuthContext';
import { getSellerProducts } from '../services/productService';
import { getSellerOrders } from '../services/orderService';

const SellerDashboardPage = () => {
  const { currentUser } = useAuth();
  const [products, setProducts] = useState({
    approved: [],
    pending: [],
    rejected: []
  });
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('products');
  
  useEffect(() => {
    const loadData = () => {
      if (currentUser) {
        const sellerProducts = getSellerProducts(currentUser.id);
        const sellerOrders = getSellerOrders(currentUser.id);
        
        setProducts({
          approved: sellerProducts.approved,
          pending: sellerProducts.pending,
          rejected: sellerProducts.rejected || []
        });
        
        setOrders(sellerOrders);
        setIsLoading(false);
      }
    };
    
    loadData();
  }, [currentUser]);
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-primary-600 border-solid"></div>
      </div>
    );
  }

  const totalRevenue = orders.reduce((total, order) => {
    const sellerItems = order.items.filter(item => item.sellerId === currentUser.id);
    return total + sellerItems.reduce((itemTotal, item) => itemTotal + (item.price * item.quantity), 0);
  }, 0);
  
  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Seller Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your products and track orders
          </p>
        </div>
        
        <Link to="/seller/add-product" className="btn-primary mt-4 md:mt-0 flex items-center">
          <FiPlus className="mr-2" /> Add New Product
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-l-4 border-yellow-500">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-100 dark:bg-yellow-900 rounded-full">
              <FiClock className="h-8 w-8 text-yellow-700 dark:text-yellow-300" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Pending Products</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">{products.pending.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-l-4 border-green-500">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 dark:bg-green-900 rounded-full">
              <FiCheck className="h-8 w-8 text-green-700 dark:text-green-300" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Active Products</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">{products.approved.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-l-4 border-blue-500">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
              <FiPackage className="h-8 w-8 text-blue-700 dark:text-blue-300" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Orders</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">{orders.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-l-4 border-primary-500">
          <div className="flex items-center">
            <div className="p-3 bg-primary-100 dark:bg-primary-900 rounded-full">
              <FiDollarSign className="h-8 w-8 text-primary-700 dark:text-primary-300" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Revenue</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">${totalRevenue.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex -mb-px">
            <button
              className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                activeTab === 'products'
                  ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('products')}
            >
              Products
            </button>
            <button
              className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                activeTab === 'orders'
                  ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('orders')}
            >
              Orders
            </button>
          </nav>
        </div>
        
        <div className="p-6">
          {activeTab === 'products' ? (
            <div className="space-y-8">
              {/* Approved Products */}
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center text-gray-800 dark:text-white">
                  <FiCheck className="text-green-600 mr-2" /> 
                  Approved Products
                </h3>
                
                {products.approved.length === 0 ? (
                  <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg text-center">
                    <p className="text-gray-600 dark:text-gray-400 mb-4">You don't have any approved products yet.</p>
                    <Link to="/seller/add-product" className="btn-primary inline-flex items-center">
                      <FiPlus className="mr-2" /> Add Product
                    </Link>
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
                            Category
                          </th>
                          <th className="px-6 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Price
                          </th>
                          <th className="px-6 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Stock
                          </th>
                          <th className="px-6 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                        {products.approved.map((product) => (
                          <tr key={product.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="h-10 w-10 flex-shrink-0">
                                  <img className="h-10 w-10 rounded-md object-cover" src={product.image} alt="" />
                                </div>
                                <div className="ml-4">
                                  <Link to={`/product/${product.id}`} className="text-sm font-medium text-gray-900 dark:text-white hover:text-primary-600">
                                    {product.name}
                                  </Link>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                              {product.category}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                              ${product.price.toFixed(2)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                              {product.stock}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                                Active
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* Pending Products */}
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center text-gray-800 dark:text-white">
                  <FiClock className="text-yellow-600 mr-2" /> 
                  Pending Products
                </h3>
                
                {products.pending.length === 0 ? (
                  <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg text-center">
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
                            Category
                          </th>
                          <th className="px-6 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Price
                          </th>
                          <th className="px-6 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Submitted On
                          </th>
                          <th className="px-6 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                        {products.pending.map((product) => (
                          <tr key={product.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="h-10 w-10 flex-shrink-0">
                                  <img className="h-10 w-10 rounded-md object-cover" src={product.image} alt="" />
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                                    {product.name}
                                  </div>
                                </div>
                              </div>
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
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                                Pending
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* Rejected Products */}
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center text-gray-800 dark:text-white">
                  <FiXCircle className="text-red-600 mr-2" /> 
                  Rejected Products
                </h3>
                
                {products.rejected.length === 0 ? (
                  <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg text-center">
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
                            Category
                          </th>
                          <th className="px-6 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Price
                          </th>
                          <th className="px-6 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Rejected On
                          </th>
                          <th className="px-6 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                        {products.rejected.map((product) => (
                          <tr key={product.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="h-10 w-10 flex-shrink-0">
                                  <img className="h-10 w-10 rounded-md object-cover" src={product.image} alt="" />
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                                    {product.name}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                              {product.category}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                              ${product.price.toFixed(2)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                              {new Date(product.updatedAt || product.createdAt).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                                Rejected
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
          ) : (
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
                Recent Orders
              </h3>
              
              {orders.length === 0 ? (
                <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg text-center">
                  <p className="text-gray-600 dark:text-gray-400">No orders yet.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Order ID
                        </th>
                        <th className="px-6 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Items
                        </th>
                        <th className="px-6 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Total
                        </th>
                        <th className="px-6 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-6 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                      {orders.map((order) => {
                        const sellerItems = order.items.filter(item => item.sellerId === currentUser.id);
                        const sellerTotal = sellerItems.reduce((total, item) => total + (item.price * item.quantity), 0);
                        
                        return (
                          <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                              #{order.id.slice(-6)}
                            </td>
                            <td className="px-6 py-4">
                              <div className="text-sm text-gray-900 dark:text-white">
                                {sellerItems.map((item, index) => (
                                  <div key={index} className="mb-1">
                                    {item.name} x {item.quantity}
                                  </div>
                                ))}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                              ${sellerTotal.toFixed(2)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                              {new Date(order.createdAt).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                order.status === 'pending'
                                  ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                                  : order.status === 'completed'
                                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                  : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
                              }`}>
                                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SellerDashboardPage;