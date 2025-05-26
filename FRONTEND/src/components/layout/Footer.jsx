import { Link } from 'react-router-dom';
import { FiMail, FiPhone, FiMapPin, FiFacebook, FiTwitter, FiInstagram, FiLinkedin } from 'react-icons/fi';
import Logo from '../ui/Logo';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-gray-200">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About section */}
          <div>
            <div className="mb-4">
              <Logo variant="light" />
            </div>
            <p className="mb-4">
              Connecting sustainable sellers with eco-conscious buyers. 
              Our marketplace is committed to promoting green solutions and sustainable products.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Facebook">
                <FiFacebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Twitter">
                <FiTwitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Instagram">
                <FiInstagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="LinkedIn">
                <FiLinkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/marketplace" className="text-gray-400 hover:text-white transition-colors">
                  Marketplace
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-gray-400 hover:text-white transition-colors">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-gray-400 hover:text-white transition-colors">
                  Register
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Product Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/marketplace?category=raw-materials" className="text-gray-400 hover:text-white transition-colors">
                  Raw Materials
                </Link>
              </li>
              <li>
                <Link to="/marketplace?category=biofuel" className="text-gray-400 hover:text-white transition-colors">
                  Biofuels
                </Link>
              </li>
              <li>
                <Link to="/marketplace?category=renewable-energy" className="text-gray-400 hover:text-white transition-colors">
                  Renewable Energy
                </Link>
              </li>
              <li>
                <Link to="/marketplace?category=eco-friendly" className="text-gray-400 hover:text-white transition-colors">
                  Eco-Friendly Products
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <FiMapPin className="h-5 w-5 mr-3 mt-0.5 text-gray-400" />
                <span>123 Green Street, Eco City, EC12 345</span>
              </li>
              <li className="flex items-center">
                <FiPhone className="h-5 w-5 mr-3 text-gray-400" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <FiMail className="h-5 w-5 mr-3 text-gray-400" />
                <span>info@greenfuelmarket.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-700 text-center">
          <p>&copy; {currentYear} GreenFuelMarket. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;