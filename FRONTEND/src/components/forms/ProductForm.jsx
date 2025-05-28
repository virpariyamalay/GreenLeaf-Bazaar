// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import { useAuth } from '../../contexts/AuthContext';
// import { addProduct } from '../../services/productService';

// const ProductForm = () => {
//   const { currentUser } = useAuth();
//   const navigate = useNavigate();
  
//   const [formData, setFormData] = useState({
//     name: '',
//     description: '',
//     price: '',
//     category: '',
//     stock: '',
//     image: '',
//     isSustainable: true,
//     sustainabilityInfo: '',
//   });
  
//   const [errors, setErrors] = useState({});
//   const [isSubmitting, setIsSubmitting] = useState(false);
  
//   const categories = [
//     { value: 'raw-materials', label: 'Raw Materials' },
//     { value: 'biofuel', label: 'Biofuel' },
//     { value: 'renewable-energy', label: 'Renewable Energy' },
//     { value: 'eco-friendly', label: 'Eco-Friendly Products' }
//   ];
  
//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value
//     }));
    
//     // Clear errors for this field
//     if (errors[name]) {
//       setErrors(prev => ({
//         ...prev,
//         [name]: null
//       }));
//     }
//   };
  
//   const validate = () => {
//     const newErrors = {};
    
//     if (!formData.name.trim()) {
//       newErrors.name = 'Product name is required';
//     }
    
//     if (!formData.description.trim()) {
//       newErrors.description = 'Description is required';
//     }
    
//     if (!formData.price) {
//       newErrors.price = 'Price is required';
//     } else if (isNaN(formData.price) || Number(formData.price) <= 0) {
//       newErrors.price = 'Price must be a positive number';
//     }
    
//     if (!formData.category) {
//       newErrors.category = 'Please select a category';
//     }
    
//     if (!formData.stock) {
//       newErrors.stock = 'Stock quantity is required';
//     } else if (isNaN(formData.stock) || Number(formData.stock) < 0) {
//       newErrors.stock = 'Stock must be a non-negative number';
//     }
    
//     if (!formData.image.trim()) {
//       newErrors.image = 'Product image URL is required';
//     } else if (!isValidUrl(formData.image)) {
//       newErrors.image = 'Please enter a valid URL';
//     }
    
//     if (formData.isSustainable && !formData.sustainabilityInfo.trim()) {
//       newErrors.sustainabilityInfo = 'Please provide sustainability information';
//     }
    
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };
  
//   const isValidUrl = (url) => {
//     try {
//       new URL(url);
//       return true;
//     } catch (e) {
//       return false;
//     }
//   };
  
//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!validate()) {
//       toast.error('Please correct the errors in the form');
//       return;
//     }
    
//     setIsSubmitting(true);
    
//     try {
//       const productData = {
//         ...formData,
//         price: Number(formData.price),
//         stock: Number(formData.stock),
//         sellerId: currentUser.id,
//         sellerName: currentUser.name || currentUser.username
//       };
      
//       const result = await addProduct(productData);
      
//       if (result.success) {
//         toast.success('Product submitted for approval');
//         navigate('/seller/dashboard');
//       } else {
//         toast.error(result.error || 'Failed to add product');
//       }
//     } catch (error) {
//       toast.error('An error occurred');
//       console.error(error);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };
  
//   return (
//     <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
//       <h2 className="text-2xl font-bold mb-6 text-gray-800">Add New Product</h2>
      
//       <form onSubmit={handleSubmit} className="space-y-6">
//         <div className="form-group">
//           <label htmlFor="name" className="form-label">Product Name</label>
//           <input
//             type="text"
//             id="name"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             className={`form-input ${errors.name ? 'border-red-500' : ''}`}
//             placeholder="Enter product name"
//           />
//           {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
//         </div>
        
//         <div className="form-group">
//           <label htmlFor="description" className="form-label">Description</label>
//           <textarea
//             id="description"
//             name="description"
//             value={formData.description}
//             onChange={handleChange}
//             className={`form-input h-24 ${errors.description ? 'border-red-500' : ''}`}
//             placeholder="Detailed description of your product"
//           ></textarea>
//           {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
//         </div>
        
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div className="form-group">
//             <label htmlFor="price" className="form-label">Price ($)</label>
//             <input
//               type="number"
//               id="price"
//               name="price"
//               value={formData.price}
//               onChange={handleChange}
//               step="0.01"
//               min="0"
//               className={`form-input ${errors.price ? 'border-red-500' : ''}`}
//               placeholder="0.00"
//             />
//             {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
//           </div>
          
//           <div className="form-group">
//             <label htmlFor="stock" className="form-label">Stock Quantity</label>
//             <input
//               type="number"
//               id="stock"
//               name="stock"
//               value={formData.stock}
//               onChange={handleChange}
//               min="0"
//               className={`form-input ${errors.stock ? 'border-red-500' : ''}`}
//               placeholder="0"
//             />
//             {errors.stock && <p className="text-red-500 text-sm mt-1">{errors.stock}</p>}
//           </div>
//         </div>
        
//         <div className="form-group">
//           <label htmlFor="category" className="form-label">Category</label>
//           <select
//             id="category"
//             name="category"
//             value={formData.category}
//             onChange={handleChange}
//             className={`form-input ${errors.category ? 'border-red-500' : ''}`}
//           >
//             <option value="">Select a category</option>
//             {categories.map(category => (
//               <option key={category.value} value={category.value}>
//                 {category.label}
//               </option>
//             ))}
//           </select>
//           {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
//         </div>
        
//         <div className="form-group">
//           <label htmlFor="image" className="form-label">Product Image URL</label>
//           <input
//             type="text"
//             id="image"
//             name="image"
//             value={formData.image}
//             onChange={handleChange}
//             className={`form-input ${errors.image ? 'border-red-500' : ''}`}
//             placeholder="https://example.com/image.jpg"
//           />
//           {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}
//           <p className="text-xs text-gray-500 mt-1">
//             Enter a valid URL for your product image
//           </p>
//         </div>
        
//         <div className="form-group">
//           <div className="flex items-center">
//             <input
//               type="checkbox"
//               id="isSustainable"
//               name="isSustainable"
//               checked={formData.isSustainable}
//               onChange={handleChange}
//               className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
//             />
//             <label htmlFor="isSustainable" className="ml-2 text-sm text-gray-700">
//               This is a sustainable product
//             </label>
//           </div>
//         </div>
        
//         {formData.isSustainable && (
//           <div className="form-group">
//             <label htmlFor="sustainabilityInfo" className="form-label">Sustainability Information</label>
//             <textarea
//               id="sustainabilityInfo"
//               name="sustainabilityInfo"
//               value={formData.sustainabilityInfo}
//               onChange={handleChange}
//               className={`form-input h-24 ${errors.sustainabilityInfo ? 'border-red-500' : ''}`}
//               placeholder="Explain how your product is sustainable"
//             ></textarea>
//             {errors.sustainabilityInfo && <p className="text-red-500 text-sm mt-1">{errors.sustainabilityInfo}</p>}
//           </div>
//         )}
        
//         <div className="mt-8 flex justify-end">
//           <button
//             type="button"
//             onClick={() => navigate(-1)}
//             className="btn-outline mr-4"
//           >
//             Cancel
//           </button>
//           <button
//             type="submit"
//             className="btn-primary"
//             disabled={isSubmitting}
//           >
//             {isSubmitting ? (
//               <span className="flex items-center">
//                 <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                 </svg>
//                 Submitting...
//               </span>
//             ) : 'Submit for Approval'}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default ProductForm;

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../../contexts/AuthContext';
import { addProduct } from '../../services/productService';

const ProductForm = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: '',
    image: '',
    isSustainable: true,
    sustainabilityInfo: '',
    // New seller details
    contactName: '',
    contactPhone: '',
    contactEmail: '',
    address: '',
    panCard: '',
    aadharCard: '',
    gstNumber: '',
    businessName: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const categories = [
    { value: 'raw-materials', label: 'Raw Materials' },
    { value: 'biofuel', label: 'Biofuel' },
    { value: 'renewable-energy', label: 'Renewable Energy' },
    { value: 'eco-friendly', label: 'Eco-Friendly Products' }
  ];
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };
  
  const validate = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Product name is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    if (!formData.price) {
      newErrors.price = 'Price is required';
    } else if (isNaN(formData.price) || Number(formData.price) <= 0) {
      newErrors.price = 'Price must be a positive number';
    }
    
    if (!formData.category) {
      newErrors.category = 'Please select a category';
    }
    
    if (!formData.stock) {
      newErrors.stock = 'Stock quantity is required';
    } else if (isNaN(formData.stock) || Number(formData.stock) < 0) {
      newErrors.stock = 'Stock must be a non-negative number';
    }
    
    if (!formData.image.trim()) {
      newErrors.image = 'Product image URL is required';
    } else if (!isValidUrl(formData.image)) {
      newErrors.image = 'Please enter a valid URL';
    }
    
    // Validate seller details
    if (!formData.contactName.trim()) {
      newErrors.contactName = 'Contact name is required';
    }
    
    if (!formData.contactPhone.trim()) {
      newErrors.contactPhone = 'Contact phone is required';
    } else if (!isValidPhone(formData.contactPhone)) {
      newErrors.contactPhone = 'Please enter a valid phone number';
    }
    
    if (!formData.contactEmail.trim()) {
      newErrors.contactEmail = 'Contact email is required';
    } else if (!isValidEmail(formData.contactEmail)) {
      newErrors.contactEmail = 'Please enter a valid email';
    }
    
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }
    
    if (!formData.panCard.trim()) {
      newErrors.panCard = 'PAN Card number is required';
    } else if (!isValidPanCard(formData.panCard)) {
      newErrors.panCard = 'Please enter a valid PAN Card number';
    }
    
    if (!formData.aadharCard.trim()) {
      newErrors.aadharCard = 'Aadhar Card number is required';
    } else if (!isValidAadharCard(formData.aadharCard)) {
      newErrors.aadharCard = 'Please enter a valid Aadhar Card number';
    }
    
    if (!formData.gstNumber.trim()) {
      newErrors.gstNumber = 'GST number is required';
    }
    
    if (!formData.businessName.trim()) {
      newErrors.businessName = 'Business name is required';
    }
    
    if (formData.isSustainable && !formData.sustainabilityInfo.trim()) {
      newErrors.sustainabilityInfo = 'Please provide sustainability information';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  };
  
  const isValidPhone = (phone) => {
    return /^\d{10}$/.test(phone);
  };
  
  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };
  
  const isValidPanCard = (pan) => {
    return /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(pan);
  };
  
  const isValidAadharCard = (aadhar) => {
    return /^\d{12}$/.test(aadhar);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) {
      toast.error('Please correct the errors in the form');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const productData = {
        ...formData,
        price: Number(formData.price),
        stock: Number(formData.stock),
        sellerId: currentUser.id,
        sellerName: currentUser.name || currentUser.username
      };
      
      const result = await addProduct(productData);
      
      if (result.success) {
        toast.success('Product submitted for approval');
        navigate('/seller/dashboard');
      } else {
        toast.error(result.error || 'Failed to add product');
      }
    } catch (error) {
      toast.error('An error occurred');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Add New Product</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Product Information Section */}
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <h3 className="text-lg font-semibold mb-4">Product Information</h3>
          
          <div className="space-y-4">
            <div className="form-group">
              <label htmlFor="name" className="form-label">Product Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`form-input ${errors.name ? 'border-red-500' : ''}`}
                placeholder="Enter product name"
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>
            
            <div className="form-group">
              <label htmlFor="description" className="form-label">Description</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className={`form-input h-24 ${errors.description ? 'border-red-500' : ''}`}
                placeholder="Detailed description of your product"
              ></textarea>
              {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-group">
                <label htmlFor="price" className="form-label">Price ($)</label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  step="0.01"
                  min="0"
                  className={`form-input ${errors.price ? 'border-red-500' : ''}`}
                  placeholder="0.00"
                />
                {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
              </div>
              
              <div className="form-group">
                <label htmlFor="stock" className="form-label">Stock Quantity</label>
                <input
                  type="number"
                  id="stock"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  min="0"
                  className={`form-input ${errors.stock ? 'border-red-500' : ''}`}
                  placeholder="0"
                />
                {errors.stock && <p className="text-red-500 text-sm mt-1">{errors.stock}</p>}
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="category" className="form-label">Category</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={`form-input ${errors.category ? 'border-red-500' : ''}`}
              >
                <option value="">Select a category</option>
                {categories.map(category => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
              {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
            </div>
            
            <div className="form-group">
              <label htmlFor="image" className="form-label">Product Image URL</label>
              <input
                type="text"
                id="image"
                name="image"
                value={formData.image}
                onChange={handleChange}
                className={`form-input ${errors.image ? 'border-red-500' : ''}`}
                placeholder="https://example.com/image.jpg"
              />
              {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}
            </div>
          </div>
        </div>

        {/* Seller Information Section */}
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <h3 className="text-lg font-semibold mb-4">Seller Information</h3>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-group">
                <label htmlFor="businessName" className="form-label">Business Name</label>
                <input
                  type="text"
                  id="businessName"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleChange}
                  className={`form-input ${errors.businessName ? 'border-red-500' : ''}`}
                  placeholder="Enter business name"
                />
                {errors.businessName && <p className="text-red-500 text-sm mt-1">{errors.businessName}</p>}
              </div>
              
              <div className="form-group">
                <label htmlFor="gstNumber" className="form-label">GST Number</label>
                <input
                  type="text"
                  id="gstNumber"
                  name="gstNumber"
                  value={formData.gstNumber}
                  onChange={handleChange}
                  className={`form-input ${errors.gstNumber ? 'border-red-500' : ''}`}
                  placeholder="Enter GST number"
                />
                {errors.gstNumber && <p className="text-red-500 text-sm mt-1">{errors.gstNumber}</p>}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-group">
                <label htmlFor="contactName" className="form-label">Contact Person Name</label>
                <input
                  type="text"
                  id="contactName"
                  name="contactName"
                  value={formData.contactName}
                  onChange={handleChange}
                  className={`form-input ${errors.contactName ? 'border-red-500' : ''}`}
                  placeholder="Enter contact person name"
                />
                {errors.contactName && <p className="text-red-500 text-sm mt-1">{errors.contactName}</p>}
              </div>
              
              <div className="form-group">
                <label htmlFor="contactPhone" className="form-label">Contact Phone</label>
                <input
                  type="text"
                  id="contactPhone"
                  name="contactPhone"
                  value={formData.contactPhone}
                  onChange={handleChange}
                  className={`form-input ${errors.contactPhone ? 'border-red-500' : ''}`}
                  placeholder="Enter 10-digit phone number"
                />
                {errors.contactPhone && <p className="text-red-500 text-sm mt-1">{errors.contactPhone}</p>}
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="contactEmail" className="form-label">Contact Email</label>
              <input
                type="email"
                id="contactEmail"
                name="contactEmail"
                value={formData.contactEmail}
                onChange={handleChange}
                className={`form-input ${errors.contactEmail ? 'border-red-500' : ''}`}
                placeholder="Enter contact email"
              />
              {errors.contactEmail && <p className="text-red-500 text-sm mt-1">{errors.contactEmail}</p>}
            </div>
            
            <div className="form-group">
              <label htmlFor="address" className="form-label">Business Address</label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className={`form-input h-24 ${errors.address ? 'border-red-500' : ''}`}
                placeholder="Enter complete business address"
              ></textarea>
              {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-group">
                <label htmlFor="panCard" className="form-label">PAN Card Number</label>
                <input
                  type="text"
                  id="panCard"
                  name="panCard"
                  value={formData.panCard}
                  onChange={handleChange}
                  className={`form-input ${errors.panCard ? 'border-red-500' : ''}`}
                  placeholder="Enter PAN card number"
                />
                {errors.panCard && <p className="text-red-500 text-sm mt-1">{errors.panCard}</p>}
              </div>
              
              <div className="form-group">
                <label htmlFor="aadharCard" className="form-label">Aadhar Card Number</label>
                <input
                  type="text"
                  id="aadharCard"
                  name="aadharCard"
                  value={formData.aadharCard}
                  onChange={handleChange}
                  className={`form-input ${errors.aadharCard ? 'border-red-500' : ''}`}
                  placeholder="Enter 12-digit Aadhar number"
                />
                {errors.aadharCard && <p className="text-red-500 text-sm mt-1">{errors.aadharCard}</p>}
              </div>
            </div>
          </div>
        </div>

        {/* Sustainability Section */}
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <h3 className="text-lg font-semibold mb-4">Sustainability Information</h3>
          
          <div className="space-y-4">
            <div className="form-group">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isSustainable"
                  name="isSustainable"
                  checked={formData.isSustainable}
                  onChange={handleChange}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label htmlFor="isSustainable" className="ml-2 text-sm text-gray-700">
                  This is a sustainable product
                </label>
              </div>
            </div>
            
            {formData.isSustainable && (
              <div className="form-group">
                <label htmlFor="sustainabilityInfo" className="form-label">Sustainability Information</label>
                <textarea
                  id="sustainabilityInfo"
                  name="sustainabilityInfo"
                  value={formData.sustainabilityInfo}
                  onChange={handleChange}
                  className={`form-input h-24 ${errors.sustainabilityInfo ? 'border-red-500' : ''}`}
                  placeholder="Explain how your product is sustainable"
                ></textarea>
                {errors.sustainabilityInfo && <p className="text-red-500 text-sm mt-1">{errors.sustainabilityInfo}</p>}
              </div>
            )}
          </div>
        </div>
        
        <div className="mt-8 flex justify-end">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="btn-outline mr-4"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white\" xmlns="http://www.w3.org/2000/svg\" fill="none\" viewBox="0 0 24 24">
                  <circle className="opacity-25\" cx="12\" cy="12\" r="10\" stroke="currentColor\" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Submitting...
              </span>
            ) : 'Submit for Approval'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;