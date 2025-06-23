// import { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { FiArrowRight, FiShoppingBag, FiCheck, FiShield } from 'react-icons/fi';
// import ProductList from '../components/ui/ProductList';
// import { getProducts } from '../services/productService';

// const HomePage = () => {
//   const [featuredProducts, setFeaturedProducts] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const loadProducts = () => {
//       const products = getProducts();
//       // Get 4 random products as featured
//       const randomProducts = [...products].sort(() => 0.5 - Math.random()).slice(0, 4);
//       setFeaturedProducts(randomProducts);
//       setIsLoading(false);
//     };

//     loadProducts();
//   }, []);

//   return (
//     <div>
//       {/* Hero Section */}
//       <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-16 md:py-24 rounded-xl overflow-hidden relative">
//         <div className="container-custom relative z-10">
//           <div className="max-w-2xl">
//             <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight animate-slide-up">
//               Sustainable Solutions for a Greener Tomorrow
//             </h1>
//             <p className="text-xl mb-8 opacity-90 animate-slide-up" style={{ animationDelay: '0.1s' }}>
//               Connect with eco-conscious sellers and buyers in the premier marketplace for sustainable raw materials and products.
//             </p>
//             <div className="flex flex-wrap gap-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
//               <Link to="/marketplace" className="btn bg-white text-primary-700 hover:bg-gray-100 font-medium px-6 py-3 rounded-md">
//                 Browse Marketplace
//               </Link>
//               <Link to="/register" className="btn bg-transparent border-2 border-white text-white hover:bg-white/10 font-medium px-6 py-3 rounded-md">
//                 Join Now
//               </Link>
//             </div>
//           </div>
//         </div>
        
//         {/* Background pattern */}
//         <div className="absolute top-0 right-0 w-1/2 h-full opacity-10">
//           <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
//             <path d="M0,0 L100,0 L100,100 L0,100 Z" fill="white" />
//           </svg>
//         </div>
//       </section>

//       {/* Features Section */}
//       <section className="py-16">
//         <div className="container-custom">
//           <h2 className="text-3xl font-bold text-center mb-12">Why Choose GreenFuelMarket?</h2>
          
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
//               <div className="bg-primary-100 text-primary-600 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
//                 <FiCheck className="w-8 h-8" />
//               </div>
//               <h3 className="text-xl font-semibold mb-3">Verified Sustainable Products</h3>
//               <p className="text-gray-600">
//                 All products undergo thorough verification to ensure they meet our sustainability standards.
//               </p>
//             </div>
            
//             <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
//               <div className="bg-primary-100 text-primary-600 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
//                 <FiShield className="w-8 h-8" />
//               </div>
//               <h3 className="text-xl font-semibold mb-3">Secure Transactions</h3>
//               <p className="text-gray-600">
//                 Our platform ensures safe and transparent transactions between buyers and sellers.
//               </p>
//             </div>
            
//             <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
//               <div className="bg-primary-100 text-primary-600 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
//                 <FiShoppingBag className="w-8 h-8" />
//               </div>
//               <h3 className="text-xl font-semibold mb-3">Direct Connection</h3>
//               <p className="text-gray-600">
//                 Connect directly with eco-conscious sellers and buyers, eliminating unnecessary intermediaries.
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Featured Products Section */}
//       <section className="py-16 bg-gray-50">
//         <div className="container-custom">
//           <div className="flex justify-between items-center mb-8">
//             <h2 className="text-3xl font-bold">Featured Products</h2>
//             <Link to="/marketplace" className="text-primary-600 hover:text-primary-700 flex items-center">
//               View all <FiArrowRight className="ml-2" />
//             </Link>
//           </div>

//           {isLoading ? (
//             <div className="flex justify-center py-12">
//               <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-primary-600 border-solid"></div>
//             </div>
//           ) : featuredProducts.length > 0 ? (
//             <ProductList initialProducts={featuredProducts} showFilters={false} />
//           ) : (
//             <div className="text-center py-12 bg-white rounded-lg shadow-sm">
//               <p className="text-lg mb-4">No products available yet.</p>
//               <Link to="/seller/add-product" className="btn-primary inline-flex items-center">
//                 Be the first to add a product <FiArrowRight className="ml-2" />
//               </Link>
//             </div>
//           )}
//         </div>
//       </section>

//       {/* Call to Action */}
//       <section className="py-16">
//         <div className="container-custom">
//           <div className="bg-secondary-600 text-white rounded-xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between">
//             <div className="mb-6 md:mb-0 md:mr-8 text-center md:text-left">
//               <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Start Selling?</h2>
//               <p className="text-secondary-100 max-w-md">
//                 Join our community of sustainable sellers and reach eco-conscious buyers globally.
//               </p>
//             </div>
//             <div className="flex flex-col sm:flex-row gap-4">
//               <Link to="/register" className="btn bg-white text-secondary-700 hover:bg-gray-100 font-medium px-6 py-3 rounded-md whitespace-nowrap">
//                 Register as Seller
//               </Link>
//               <Link to="/login" className="btn bg-transparent border-2 border-white text-white hover:bg-white/10 font-medium px-6 py-3 rounded-md">
//                 Login
//               </Link>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default HomePage;

// EnhancedHomePage.jsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import { motion } from 'framer-motion';
import { FiArrowRight, FiShoppingBag, FiCheck, FiShield, FiUsers } from 'react-icons/fi';
import ProductList from '../components/ui/ProductList';
import { getProducts } from '../services/productService';

const HomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProducts = () => {
      const products = getProducts();
      const randomProducts = [...products].sort(() => 0.5 - Math.random()).slice(0, 4);
      setFeaturedProducts(randomProducts);
      setIsLoading(false);
    };
    loadProducts();
  }, []);

  const heroSlides = [
    {
      title: 'Empowering Green Commerce',
      subtitle: 'Promote eco-friendly buying and selling practices.',
      image: '/images/slide1.jpg'
    },
    {
      title: 'Connect with Eco-Conscious Buyers',
      subtitle: 'Build a sustainable future through conscious trade.',
      image: '/images/slide2.jpg'
    },
    {
      title: 'Verified Eco Products Only',
      subtitle: 'Quality assurance through thorough sustainability checks.',
      image: '/images/slide3.jpg'
    }
  ];

  const sliderSettings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 4000,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true
  };

  return (
    <div>
      {/* Hero Slider */}
      <section className="relative h-[500px] md:h-[600px]">
        <Slider {...sliderSettings}>
          {heroSlides.map((slide, index) => (
            <div key={index} className="relative h-full w-full">
              <img src={slide.image} alt="Hero" className="object-cover w-full h-[500px] md:h-[600px]" />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-center text-white px-4">
                <motion.h2 className="text-4xl md:text-5xl font-bold mb-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                  {slide.title}
                </motion.h2>
                <motion.p className="text-lg md:text-xl" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                  {slide.subtitle}
                </motion.p>
              </div>
            </div>
          ))}
        </Slider>
      </section>

      {/* About Section */}
      <section className="py-16 bg-white">
        <div className="container-custom text-center">
          <motion.h2 className="text-3xl font-bold mb-6" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            About GreenFuelMarket
          </motion.h2>
          <motion.p className="text-gray-700 max-w-3xl mx-auto" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            GreenFuelMarket is a revolutionary platform bridging the gap between sustainable product providers and conscious consumers. We aim to create a transparent, eco-friendly marketplace where trust and environmental integrity are the core values.
          </motion.p>
        </div>
      </section>

      {/* Our Goals */}
      <section className="py-16 bg-gray-100">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-12">Our Goals</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <FiCheck className="w-8 h-8" />, title: 'Sustainability First', desc: 'Promote only verified and eco-friendly products.'
              },
              {
                icon: <FiShield className="w-8 h-8" />, title: 'Safe & Transparent', desc: 'Enable secure transactions between trusted parties.'
              },
              {
                icon: <FiUsers className="w-8 h-8" />, title: 'Empower Communities', desc: 'Support local and global eco-conscious communities.'
              }
            ].map((goal, idx) => (
              <motion.div key={idx} className="bg-white p-6 rounded-lg shadow-md text-center" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * idx }}>
                <div className="bg-primary-100 text-primary-600 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                  {goal.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{goal.title}</h3>
                <p className="text-gray-600">{goal.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Featured Products</h2>
            <Link to="/marketplace" className="text-primary-600 hover:text-primary-700 flex items-center">
              View all <FiArrowRight className="ml-2" />
            </Link>
          </div>
          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-primary-600"></div>
            </div>
          ) : featuredProducts.length > 0 ? (
            <ProductList initialProducts={featuredProducts} showFilters={false} />
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg shadow-sm">
              <p className="text-lg mb-4">No products available yet.</p>
              <Link to="/seller/add-product" className="btn-primary inline-flex items-center">
                Be the first to add a product <FiArrowRight className="ml-2" />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-secondary-600 text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-4">Become a Part of the Green Movement</h2>
          <p className="mb-6">Join GreenFuelMarket today and grow your sustainable impact globally.</p>
          <div className="flex justify-center gap-4">
            <Link to="/register" className="btn bg-white text-secondary-700 hover:bg-gray-100 px-6 py-3 rounded-md">
              Register as Seller
            </Link>
            <Link to="/login" className="btn border-2 border-white hover:bg-white/10 px-6 py-3 rounded-md">
              Login
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
