import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import MarketplacePage from './pages/MarketplacePage';
import ProductDetailPage from './pages/ProductDetailPage';
import SellerDashboardPage from './pages/SellerDashboardPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import AdminOrdersPage from './pages/AdminOrdersPage';
import CartPage from './pages/CartPage';
import UserProfilePage from './pages/UserProfilePage';
import NotFoundPage from './pages/NotFoundPage';
import AddProductPage from './pages/AddProductPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';

const ProtectedRoute = ({ element, allowedRoles, redirectPath = '/login' }) => {
  const { currentUser, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(currentUser?.role)) {
    console.log('Role check failed:', { userRole: currentUser?.role, allowedRoles });
    return <Navigate to="/" replace />;
  }

  return element;
};

function App() {
  const { checkAuthentication } = useAuth();

  useEffect(() => {
    checkAuthentication();
  }, [checkAuthentication]);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/marketplace" element={<MarketplacePage />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
        <Route path="/cart" element={<CartPage />} />

        {/* Protected routes */}
        <Route
          path="/seller/dashboard"
          element={<ProtectedRoute
            element={<SellerDashboardPage />}
            allowedRoles={['seller', 'admin']}
          />}
        />
        <Route
          path="/seller/add-product"
          element={<ProtectedRoute
            element={<AddProductPage />}
            allowedRoles={['seller', 'admin']}
          />}
        />
        <Route
          path="/admin/dashboard"
          element={<ProtectedRoute
            element={<AdminDashboardPage />}
            allowedRoles={['admin']}
          />}
        />
        <Route
          path="/admin/orders"
          element={<ProtectedRoute
            element={<AdminOrdersPage />}
            allowedRoles={['admin']}
          />}
        />
        <Route
          path="/profile"
          element={<ProtectedRoute
            element={<UserProfilePage />}
            allowedRoles={['buyer', 'seller', 'admin']}
          />}
        />

        {/* 404 - Not found */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;