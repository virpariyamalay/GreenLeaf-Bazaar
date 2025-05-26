// import { createContext, useContext, useState, useCallback, useEffect } from 'react';
// import { toast } from 'react-toastify';

// const AuthContext = createContext();

// export const useAuth = () => useContext(AuthContext);

// export const AuthProvider = ({ children }) => {
//   const [currentUser, setCurrentUser] = useState(null);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [loading, setLoading] = useState(true);

//   // Initialize users in localStorage if they don't exist
//   useEffect(() => {
//     const initializeUsers = () => {
//       const users = localStorage.getItem('users');
//       if (!users) {
//         // Create default admin user
//         const defaultUsers = [
//           {
//             id: '1',
//             username: 'admin',
//             email: 'admin@greenfuelmarket.com',
//             password: 'admin123', // In a real app, this would be hashed
//             role: 'admin',
//             name: 'Admin User',
//             createdAt: new Date().toISOString()
//           }
//         ];
//         localStorage.setItem('users', JSON.stringify(defaultUsers));
//       }
//     };
    
//     initializeUsers();
//   }, []);

//   // Check if user is already logged in (from localStorage)
//   const checkAuthentication = useCallback(() => {
//     setLoading(true);
//     const storedUser = localStorage.getItem('currentUser');
    
//     if (storedUser) {
//       const user = JSON.parse(storedUser);
//       setCurrentUser(user);
//       setIsAuthenticated(true);
//     }
    
//     setLoading(false);
//   }, []);

//   // Login function
//   const login = useCallback(async (email, password) => {
//     try {
//       const users = JSON.parse(localStorage.getItem('users') || '[]');
//       const user = users.find(u => u.email === email && u.password === password);
      
//       if (user) {
//         setCurrentUser(user);
//         setIsAuthenticated(true);
//         localStorage.setItem('currentUser', JSON.stringify(user));
//         toast.success('Login successful!');
//         return { success: true, user };
//       } else {
//         toast.error('Invalid email or password');
//         return { success: false, error: 'Invalid email or password' };
//       }
//     } catch (error) {
//       toast.error('An error occurred during login');
//       return { success: false, error: error.message };
//     }
//   }, []);

//   // Register function
//   const register = useCallback(async (userData) => {
//     try {
//       const users = JSON.parse(localStorage.getItem('users') || '[]');
      
//       // Check if user already exists
//       if (users.some(user => user.email === userData.email)) {
//         toast.error('Email already in use');
//         return { success: false, error: 'Email already in use' };
//       }
      
//       const newUser = {
//         id: Date.now().toString(),
//         ...userData,
//         createdAt: new Date().toISOString(),
//         role: userData.role || 'buyer' // Default role is buyer
//       };
      
//       users.push(newUser);
//       localStorage.setItem('users', JSON.stringify(users));
      
//       // Auto login after registration
//       setCurrentUser(newUser);
//       setIsAuthenticated(true);
//       localStorage.setItem('currentUser', JSON.stringify(newUser));
      
//       toast.success('Registration successful!');
//       return { success: true, user: newUser };
//     } catch (error) {
//       toast.error('An error occurred during registration');
//       return { success: false, error: error.message };
//     }
//   }, []);

//   // Logout function
//   const logout = useCallback(() => {
//     setCurrentUser(null);
//     setIsAuthenticated(false);
//     localStorage.removeItem('currentUser');
//     toast.success('Logged out successfully');
//   }, []);

//   // Update user profile
//   const updateProfile = useCallback((updatedData) => {
//     try {
//       const users = JSON.parse(localStorage.getItem('users') || '[]');
//       const userIndex = users.findIndex(user => user.id === currentUser.id);
      
//       if (userIndex !== -1) {
//         const updatedUser = { ...users[userIndex], ...updatedData };
//         users[userIndex] = updatedUser;
        
//         localStorage.setItem('users', JSON.stringify(users));
//         localStorage.setItem('currentUser', JSON.stringify(updatedUser));
        
//         setCurrentUser(updatedUser);
//         toast.success('Profile updated successfully');
//         return { success: true };
//       }
      
//       return { success: false, error: 'User not found' };
//     } catch (error) {
//       toast.error('Failed to update profile');
//       return { success: false, error: error.message };
//     }
//   }, [currentUser]);

//   // Check if user has specific role
//   const hasRole = useCallback((role) => {
//     return currentUser?.role === role;
//   }, [currentUser]);

//   // Context value
//   const value = {
//     currentUser,
//     isAuthenticated,
//     loading,
//     login,
//     register,
//     logout,
//     updateProfile,
//     checkAuthentication,
//     hasRole,
//     isAdmin: currentUser?.role === 'admin',
//     isSeller: currentUser?.role === 'seller' || currentUser?.role === 'admin',
//     isBuyer: currentUser?.role === 'buyer' || currentUser?.role === 'seller' || currentUser?.role === 'admin'
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { toast } from 'react-toastify';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Initialize users in localStorage if they don't exist
  useEffect(() => {
    const initializeUsers = () => {
      const users = localStorage.getItem('users');
      if (!users) {
        // Create default admin user
        const defaultUsers = [
          {
            id: '1',
            username: 'admin',
            email: 'admin@greenfuelmarket.com',
            password: 'admin123', // In a real app, this would be hashed
            role: 'admin',
            name: 'Admin User',
            createdAt: new Date().toISOString()
          }
        ];
        localStorage.setItem('users', JSON.stringify(defaultUsers));
      }
    };
    
    initializeUsers();
    checkAuthentication();
  }, []);

  // Check if user is already logged in (from localStorage)
  const checkAuthentication = useCallback(() => {
    setLoading(true);
    const storedUser = localStorage.getItem('currentUser');
    
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setCurrentUser(user);
      setIsAuthenticated(true);
    }
    
    setLoading(false);
  }, []);

  // Login function
  const login = useCallback(async (email, password) => {
    try {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const user = users.find(u => u.email === email && u.password === password);
      
      if (user) {
        setCurrentUser(user);
        setIsAuthenticated(true);
        localStorage.setItem('currentUser', JSON.stringify(user));
        toast.success('Login successful!');
        return { success: true, user };
      } else {
        toast.error('Invalid email or password');
        return { success: false, error: 'Invalid email or password' };
      }
    } catch (error) {
      toast.error('An error occurred during login');
      return { success: false, error: error.message };
    }
  }, []);

  // Register function
  const register = useCallback(async (userData) => {
    try {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      
      // Check if user already exists
      if (users.some(user => user.email === userData.email)) {
        toast.error('Email already in use');
        return { success: false, error: 'Email already in use' };
      }
      
      const newUser = {
        id: Date.now().toString(),
        ...userData,
        createdAt: new Date().toISOString(),
        role: userData.role || 'buyer' // Default role is buyer
      };
      
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      
      // Auto login after registration
      setCurrentUser(newUser);
      setIsAuthenticated(true);
      localStorage.setItem('currentUser', JSON.stringify(newUser));
      
      toast.success('Registration successful!');
      return { success: true, user: newUser };
    } catch (error) {
      toast.error('An error occurred during registration');
      return { success: false, error: error.message };
    }
  }, []);

  // Logout function
  const logout = useCallback(() => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('currentUser');
    toast.success('Logged out successfully');
  }, []);

  // Update user profile
  const updateProfile = useCallback((updatedData) => {
    try {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const userIndex = users.findIndex(user => user.id === currentUser.id);
      
      if (userIndex !== -1) {
        const updatedUser = { ...users[userIndex], ...updatedData };
        users[userIndex] = updatedUser;
        
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('currentUser', JSON.stringify(updatedUser));
        
        setCurrentUser(updatedUser);
        toast.success('Profile updated successfully');
        return { success: true };
      }
      
      return { success: false, error: 'User not found' };
    } catch (error) {
      toast.error('Failed to update profile');
      return { success: false, error: error.message };
    }
  }, [currentUser]);

  // Check if user has specific role
  const hasRole = useCallback((role) => {
    return currentUser?.role === role;
  }, [currentUser]);

  // Context value
  const value = {
    currentUser,
    isAuthenticated,
    loading,
    login,
    register,
    logout,
    updateProfile,
    checkAuthentication,
    hasRole,
    isAdmin: currentUser?.role === 'admin',
    isSeller: currentUser?.role === 'seller' || currentUser?.role === 'admin',
    isBuyer: currentUser?.role === 'buyer' || currentUser?.role === 'seller' || currentUser?.role === 'admin'
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;