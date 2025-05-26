import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { FiUser, FiMail, FiEdit, FiLock } from 'react-icons/fi';
import { useAuth } from '../contexts/AuthContext';

const UserProfilePage = () => {
  const { currentUser, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  useEffect(() => {
    if (currentUser) {
      setFormData({
        name: currentUser.name || '',
        email: currentUser.email || '',
        password: '',
        confirmPassword: ''
      });
    }
  }, [currentUser]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear errors for this field
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
      newErrors.name = 'Name is required';
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    // Only validate password if it's being changed
    if (formData.password) {
      if (formData.password.length < 6) {
        newErrors.password = 'Password must be at least 6 characters';
      }
      
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) {
      toast.error('Please correct the errors in the form');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Only include password if it was changed
      const updateData = {
        name: formData.name,
        email: formData.email
      };
      
      if (formData.password) {
        updateData.password = formData.password;
      }
      
      const result = await updateProfile(updateData);
      
      if (result.success) {
        toast.success('Profile updated successfully');
        setIsEditing(false);
        // Clear password fields
        setFormData(prev => ({
          ...prev,
          password: '',
          confirmPassword: ''
        }));
      } else {
        toast.error(result.error || 'Failed to update profile');
      }
    } catch (error) {
      toast.error('An error occurred');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Your Profile</h1>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 bg-primary-600 text-white">
          <h2 className="text-xl font-semibold">Account Information</h2>
        </div>
        
        <div className="p-6">
          {!isEditing ? (
            <div className="space-y-4">
              <div className="flex items-center py-3 border-b border-gray-200">
                <div className="w-40 flex-shrink-0 flex items-center">
                  <FiUser className="text-gray-500 mr-2" />
                  <span className="text-gray-500 font-medium">Name</span>
                </div>
                <div className="flex-1 font-medium">{currentUser?.name}</div>
              </div>
              
              <div className="flex items-center py-3 border-b border-gray-200">
                <div className="w-40 flex-shrink-0 flex items-center">
                  <FiMail className="text-gray-500 mr-2" />
                  <span className="text-gray-500 font-medium">Email</span>
                </div>
                <div className="flex-1 font-medium">{currentUser?.email}</div>
              </div>
              
              <div className="flex items-center py-3">
                <div className="w-40 flex-shrink-0 flex items-center">
                  <FiUser className="text-gray-500 mr-2" />
                  <span className="text-gray-500 font-medium">Role</span>
                </div>
                <div className="flex-1">
                  <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-primary-100 text-primary-800">
                    {currentUser?.role.charAt(0).toUpperCase() + currentUser?.role.slice(1)}
                  </span>
                </div>
              </div>
              
              <div className="mt-6">
                <button
                  onClick={() => setIsEditing(true)}
                  className="btn-primary flex items-center"
                >
                  <FiEdit className="mr-2" /> Edit Profile
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="form-group">
                <label htmlFor="name" className="form-label flex items-center">
                  <FiUser className="mr-2" />
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`form-input ${errors.name ? 'border-red-500' : ''}`}
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>
              
              <div className="form-group">
                <label htmlFor="email" className="form-label flex items-center">
                  <FiMail className="mr-2" />
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`form-input ${errors.email ? 'border-red-500' : ''}`}
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>
              
              <div className="form-group">
                <label htmlFor="password" className="form-label flex items-center">
                  <FiLock className="mr-2" />
                  New Password (optional)
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`form-input ${errors.password ? 'border-red-500' : ''}`}
                  placeholder="Leave blank to keep current password"
                />
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
              </div>
              
              {formData.password && (
                <div className="form-group">
                  <label htmlFor="confirmPassword" className="form-label flex items-center">
                    <FiLock className="mr-2" />
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`form-input ${errors.confirmPassword ? 'border-red-500' : ''}`}
                  />
                  {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
                </div>
              )}
              
              <div className="flex justify-end space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    setFormData({
                      name: currentUser.name || '',
                      email: currentUser.email || '',
                      password: '',
                      confirmPassword: ''
                    });
                    setErrors({});
                  }}
                  className="btn-outline"
                  disabled={isSubmitting}
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
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Saving...
                    </span>
                  ) : 'Save Changes'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;