import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import { FiShoppingCart, FiUser, FiMenu, FiX, FiLogOut } from 'react-icons/fi';
import Logo from '../ui/Logo';
import ThemeToggle from '../ui/ThemeToggle';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const { isAuthenticated, currentUser, logout, isAdmin, isSeller } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
    setIsProfileMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50">
      <div className="container-custom py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <Logo />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink to="/" className={({ isActive }) =>
              isActive ? 'text-primary-700 dark:text-primary-400 font-semibold' : 'text-gray-700 dark:text-gray-300 hover:text-primary-700 dark:hover:text-primary-400 transition-colors'
            }>
              Home
            </NavLink>
            <NavLink to="/marketplace" className={({ isActive }) =>
              isActive ? 'text-primary-700 dark:text-primary-400 font-semibold' : 'text-gray-700 dark:text-gray-300 hover:text-primary-700 dark:hover:text-primary-400 transition-colors'
            }>
              Marketplace
            </NavLink>
            <NavLink to="/about" className={({ isActive }) =>
              isActive ? 'text-primary-700 dark:text-primary-400 font-semibold' : 'text-gray-700 dark:text-gray-300 hover:text-primary-700 dark:hover:text-primary-400 transition-colors'
            }>
              About
            </NavLink>
            <NavLink to="/contact" className={({ isActive }) =>
              isActive ? 'text-primary-700 dark:text-primary-400 font-semibold' : 'text-gray-700 dark:text-gray-300 hover:text-primary-700 dark:hover:text-primary-400 transition-colors'
            }>
              Contact
            </NavLink>

            {isSeller && (
              <NavLink to="/seller/dashboard" className={({ isActive }) =>
                isActive ? 'text-primary-700 dark:text-primary-400 font-semibold' : 'text-gray-700 dark:text-gray-300 hover:text-primary-700 dark:hover:text-primary-400 transition-colors'
              }>
                Seller Dashboard
              </NavLink>
            )}

            {isAdmin && (
              <NavLink to="/admin/dashboard" className={({ isActive }) =>
                isActive ? 'text-primary-700 dark:text-primary-400 font-semibold' : 'text-gray-700 dark:text-gray-300 hover:text-primary-700 dark:hover:text-primary-400 transition-colors'
              }>
                Admin Dashboard
              </NavLink>
            )}
          </div>

          {/* Right side actions */}
          <div className="hidden md:flex items-center space-x-6">
            <ThemeToggle />
            {isAuthenticated ? (
              <div className="flex items-center space-x-6">
                <Link to="/cart\" className="relative">
                  <FiShoppingCart className="text-gray-700 dark:text-gray-300 hover:text-primary-700 dark:hover:text-primary-400 text-xl" />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-primary-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </Link>
                <div className="relative">
                  <button
                    className="flex items-center text-gray-700 dark:text-gray-300 hover:text-primary-700 dark:hover:text-primary-400"
                    onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  >
                    <FiUser className="text-xl" />
                  </button>
                  {isProfileMenuOpen && (
                    <div
                      className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-10"
                      onMouseLeave={() => setIsProfileMenuOpen(false)}
                    >
                      <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {currentUser.name || currentUser.username}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {currentUser.email}
                        </p>
                        <p className="text-xs text-primary-600 dark:text-primary-400 mt-1">
                          {currentUser.role.charAt(0).toUpperCase() + currentUser.role.slice(1)}
                        </p>
                      </div>
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={() => setIsProfileMenuOpen(false)}
                      >
                        View Profile
                      </Link>
                      {isSeller && (
                        <Link
                          to="/seller/add-product"
                          className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                          onClick={() => setIsProfileMenuOpen(false)}
                        >
                          Add Product
                        </Link>
                      )}
                    </div>
                  )}
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center text-gray-700 dark:text-gray-300 hover:text-primary-700 dark:hover:text-primary-400"
                >
                  <FiLogOut className="text-xl" />
                </button>
              </div>
            ) : (
              <div className="flex space-x-2">
                <Link to="/login" className="btn-outline dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700">
                  Login
                </Link>
                <Link to="/register" className="btn-primary">
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4">
            <ThemeToggle />
            {isAuthenticated && (
              <>
                <Link to="/cart\" className="relative">
                  <FiShoppingCart className="text-gray-700 dark:text-gray-300 text-xl" />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-primary-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-gray-700 dark:text-gray-300 hover:text-primary-700 dark:hover:text-primary-400"
                >
                  <FiLogOut className="text-xl" />
                </button>
              </>
            )}
            <button
              onClick={toggleMenu}
              className="text-gray-700 dark:text-gray-300 hover:text-primary-700 dark:hover:text-primary-400 focus:outline-none"
            >
              {isMenuOpen ? (
                <FiX className="h-6 w-6" />
              ) : (
                <FiMenu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 py-2 px-4 shadow-inner animate-fade-in">
          <div className="flex flex-col space-y-3">
            {isAuthenticated && (
              <div className="py-3 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-3">
                  <FiUser className="text-gray-500 dark:text-gray-400" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {currentUser.name || currentUser.username}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {currentUser.email}
                    </p>
                  </div>
                </div>
              </div>
            )}
            <NavLink to="/" className={({ isActive }) =>
              isActive ? 'text-primary-700 dark:text-primary-400 font-semibold py-2' : 'text-gray-700 dark:text-gray-300 hover:text-primary-700 dark:hover:text-primary-400 py-2'
            } onClick={closeMenu}>
              Home
            </NavLink>
            <NavLink to="/marketplace" className={({ isActive }) =>
              isActive ? 'text-primary-700 dark:text-primary-400 font-semibold py-2' : 'text-gray-700 dark:text-gray-300 hover:text-primary-700 dark:hover:text-primary-400 py-2'
            } onClick={closeMenu}>
              Marketplace
            </NavLink>
            <NavLink to="/about" className={({ isActive }) =>
              isActive ? 'text-primary-700 dark:text-primary-400 font-semibold py-2' : 'text-gray-700 dark:text-gray-300 hover:text-primary-700 dark:hover:text-primary-400 py-2'
            } onClick={closeMenu}>
              About
            </NavLink>
            <NavLink to="/contact" className={({ isActive }) =>
              isActive ? 'text-primary-700 dark:text-primary-400 font-semibold py-2' : 'text-gray-700 dark:text-gray-300 hover:text-primary-700 dark:hover:text-primary-400 py-2'
            } onClick={closeMenu}>
              Contact
            </NavLink>

            {isSeller && (
              <NavLink to="/seller/dashboard" className={({ isActive }) =>
                isActive ? 'text-primary-700 dark:text-primary-400 font-semibold py-2' : 'text-gray-700 dark:text-gray-300 hover:text-primary-700 dark:hover:text-primary-400 py-2'
              } onClick={closeMenu}>
                Seller Dashboard
              </NavLink>
            )}

            {isAdmin && (
              <NavLink to="/admin/dashboard" className={({ isActive }) =>
                isActive ? 'text-primary-700 dark:text-primary-400 font-semibold py-2' : 'text-gray-700 dark:text-gray-300 hover:text-primary-700 dark:hover:text-primary-400 py-2'
              } onClick={closeMenu}>
                Admin Dashboard
              </NavLink>
            )}

            {isSeller && (
              <NavLink to="/seller/add-product" className={({ isActive }) =>
                isActive ? 'text-primary-700 dark:text-primary-400 font-semibold py-2' : 'text-gray-700 dark:text-gray-300 hover:text-primary-700 dark:hover:text-primary-400 py-2'
              } onClick={closeMenu}>
                Add Product
              </NavLink>
            )}

            {isAuthenticated ? (
              <NavLink to="/profile" className={({ isActive }) =>
                isActive ? 'text-primary-700 dark:text-primary-400 font-semibold py-2' : 'text-gray-700 dark:text-gray-300 hover:text-primary-700 dark:hover:text-primary-400 py-2'
              } onClick={closeMenu}>
                My Profile
              </NavLink>
            ) : (
              <div className="flex flex-col space-y-2 pt-2 pb-3">
                <Link to="/login" className="btn-outline dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700 w-full text-center" onClick={closeMenu}>
                  Login
                </Link>
                <Link to="/register" className="btn-primary w-full text-center" onClick={closeMenu}>
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;