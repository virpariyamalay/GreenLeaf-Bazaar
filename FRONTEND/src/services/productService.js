// Initialize products in localStorage if they don't exist
const initializeProducts = () => {
  const products = localStorage.getItem('products');
  if (!products) {
    const initialProducts = [];
    localStorage.setItem('products', JSON.stringify(initialProducts));
  }

  const pendingProducts = localStorage.getItem('pendingProducts');
  if (!pendingProducts) {
    localStorage.setItem('pendingProducts', JSON.stringify([]));
  }

  const rejectedProducts = localStorage.getItem('rejectedProducts');
  if (!rejectedProducts) {
    localStorage.setItem('rejectedProducts', JSON.stringify([]));
  }
};

// Get all approved products
export const getProducts = () => {
  initializeProducts();
  const products = JSON.parse(localStorage.getItem('products') || '[]');
  const rejectedProducts = JSON.parse(localStorage.getItem('rejectedProducts') || '[]');
  
  // Combine approved and rejected products for admin view
  return [...products, ...rejectedProducts];
};

// Get only approved products for marketplace
export const getApprovedProducts = () => {
  initializeProducts();
  const products = JSON.parse(localStorage.getItem('products') || '[]');
  return products;
};

// Get pending products (for admin)
export const getPendingProducts = () => {
  initializeProducts();
  const pendingProducts = JSON.parse(localStorage.getItem('pendingProducts') || '[]');
  return pendingProducts;
};

// Get rejected products
export const getRejectedProducts = () => {
  initializeProducts();
  const rejectedProducts = JSON.parse(localStorage.getItem('rejectedProducts') || '[]');
  return rejectedProducts;
};

// Get seller's products
export const getSellerProducts = (sellerId) => {
  const allProducts = getApprovedProducts();
  const pendingProducts = getPendingProducts();
  const rejectedProducts = getRejectedProducts();
  
  const approvedProducts = allProducts.filter(product => product.sellerId === sellerId);
  const sellerPendingProducts = pendingProducts.filter(product => product.sellerId === sellerId);
  const sellerRejectedProducts = rejectedProducts.filter(product => product.sellerId === sellerId);
  
  return {
    approved: approvedProducts,
    pending: sellerPendingProducts,
    rejected: sellerRejectedProducts
  };
};

// Get product by ID
export const getProductById = (productId) => {
  const allProducts = getApprovedProducts();
  return allProducts.find(product => product.id === productId) || null;
};

// Update product stock
export const updateProductStock = (productId, quantity) => {
  const products = JSON.parse(localStorage.getItem('products') || '[]');
  const productIndex = products.findIndex(p => p.id === productId);
  
  if (productIndex !== -1) {
    products[productIndex].stock -= quantity;
    localStorage.setItem('products', JSON.stringify(products));
    return true;
  }
  return false;
};

// Check if quantity is available
export const isQuantityAvailable = (productId, requestedQuantity) => {
  const product = getProductById(productId);
  return product && product.stock >= requestedQuantity;
};

// Add new product (goes to pending)
export const addProduct = (productData) => {
  try {
    const pendingProducts = JSON.parse(localStorage.getItem('pendingProducts') || '[]');
    const newProduct = {
      id: Date.now().toString(),
      ...productData,
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    
    pendingProducts.push(newProduct);
    localStorage.setItem('pendingProducts', JSON.stringify(pendingProducts));
    
    return { success: true, product: newProduct };
  } catch (error) {
    console.error('Error adding product:', error);
    return { success: false, error: error.message };
  }
};

// Approve product (admin only)
export const approveProduct = (productId) => {
  try {
    const pendingProducts = JSON.parse(localStorage.getItem('pendingProducts') || '[]');
    const products = JSON.parse(localStorage.getItem('products') || '[]');
    
    const productIndex = pendingProducts.findIndex(product => product.id === productId);
    
    if (productIndex === -1) {
      return { success: false, error: 'Product not found' };
    }
    
    // Move from pending to approved
    const approvedProduct = { ...pendingProducts[productIndex], status: 'approved' };
    products.push(approvedProduct);
    
    // Remove from pending
    const updatedPendingProducts = pendingProducts.filter(product => product.id !== productId);
    
    localStorage.setItem('products', JSON.stringify(products));
    localStorage.setItem('pendingProducts', JSON.stringify(updatedPendingProducts));
    
    return { success: true, product: approvedProduct };
  } catch (error) {
    console.error('Error approving product:', error);
    return { success: false, error: error.message };
  }
};

// Reject product (admin only)
export const rejectProduct = (productId) => {
  try {
    const pendingProducts = JSON.parse(localStorage.getItem('pendingProducts') || '[]');
    const rejectedProducts = JSON.parse(localStorage.getItem('rejectedProducts') || '[]');
    
    const productToReject = pendingProducts.find(product => product.id === productId);
    
    if (!productToReject) {
      return { success: false, error: 'Product not found' };
    }
    
    // Add to rejected products
    rejectedProducts.push({
      ...productToReject,
      status: 'rejected',
      rejectedAt: new Date().toISOString()
    });
    
    // Remove from pending
    const updatedPendingProducts = pendingProducts.filter(product => product.id !== productId);
    
    localStorage.setItem('rejectedProducts', JSON.stringify(rejectedProducts));
    localStorage.setItem('pendingProducts', JSON.stringify(updatedPendingProducts));
    
    return { success: true, product: productToReject };
  } catch (error) {
    console.error('Error rejecting product:', error);
    return { success: false, error: error.message };
  }
};

// Update product
export const updateProduct = (productId, updatedData) => {
  try {
    const products = JSON.parse(localStorage.getItem('products') || '[]');
    const productIndex = products.findIndex(product => product.id === productId);
    
    if (productIndex === -1) {
      return { success: false, error: 'Product not found' };
    }
    
    products[productIndex] = { ...products[productIndex], ...updatedData };
    localStorage.setItem('products', JSON.stringify(products));
    
    return { success: true, product: products[productIndex] };
  } catch (error) {
    console.error('Error updating product:', error);
    return { success: false, error: error.message };
  }
};

// Delete product (from approved products)
export const deleteProduct = (productId) => {
  try {
    const products = JSON.parse(localStorage.getItem('products') || '[]');
    const updatedProducts = products.filter(product => product.id !== productId);
    
    localStorage.setItem('products', JSON.stringify(updatedProducts));
    
    return { success: true };
  } catch (error) {
    console.error('Error deleting product:', error);
    return { success: false, error: error.message };
  }
};

// Search products (only approved)
export const searchProducts = (query) => {
  const allProducts = getApprovedProducts();
  
  if (!query) return allProducts;
  
  const lowercaseQuery = query.toLowerCase();
  return allProducts.filter(product => 
    product.name.toLowerCase().includes(lowercaseQuery) ||
    product.description.toLowerCase().includes(lowercaseQuery) ||
    product.category.toLowerCase().includes(lowercaseQuery)
  );
};

// Filter products by category (only approved)
export const filterProductsByCategory = (category) => {
  const allProducts = getApprovedProducts();
  
  if (!category || category === 'all') return allProducts;
  
  return allProducts.filter(product => 
    product.category.toLowerCase() === category.toLowerCase()
  );
};