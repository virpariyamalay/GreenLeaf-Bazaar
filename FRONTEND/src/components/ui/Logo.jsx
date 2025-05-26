import { Link } from 'react-router-dom';
import { FaSeedling } from 'react-icons/fa'; // Updated to FaSeedling

const Logo = ({ variant = 'dark' }) => {
  const textColorClass = variant === 'light' ? 'text-white' : 'text-gray-800';

  return (
    <Link to="/" className={`flex items-center ${textColorClass}`}>
      <FaSeedling className="text-primary-600 h-7 w-7" />
      <span className="ml-2 text-xl font-heading font-bold tracking-tight">
        Green<span className="text-primary-600">Fuel</span>Market
      </span>
    </Link>
  );
};

export default Logo;
