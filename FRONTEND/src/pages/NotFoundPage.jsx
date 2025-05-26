import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="text-7xl font-bold text-primary-600 mb-6">404</div>
      <h1 className="text-3xl font-bold mb-4">Page Not Found</h1>
      <p className="text-gray-600 mb-8 max-w-md">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Link to="/" className="btn-primary flex items-center">
        <FiArrowLeft className="mr-2" /> Back to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;