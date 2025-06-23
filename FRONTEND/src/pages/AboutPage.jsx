import { motion } from 'framer-motion';
import { FiUsers, FiTarget, FiAward } from 'react-icons/fi';

const AboutPage = () => {
  return (
    <div className="py-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="container-custom"
      >
        <h1 className="text-4xl font-bold text-center mb-8">About GreenFuelMarket</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="text-gray-600 mb-6">
              At GreenFuelMarket, we're committed to accelerating the world's transition to sustainable energy 
              and eco-friendly products. Our marketplace connects conscious buyers with verified sellers who 
              share our vision for a greener future.
            </p>
            <p className="text-gray-600">
              We believe that by making sustainable products more accessible and transparent, we can help 
              businesses and individuals make better choices for our planet.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="relative"
          >
            <img 
              src="https://images.pexels.com/photos/2990644/pexels-photo-2990644.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="Sustainable Energy"
              className="rounded-lg shadow-xl"
            />
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <FiUsers className="text-4xl text-primary-600 mb-4" />
            <h3 className="text-xl font-bold mb-2">Community First</h3>
            <p className="text-gray-600">
              We foster a community of environmentally conscious buyers and sellers, 
              creating a marketplace built on trust and shared values.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <FiTarget className="text-4xl text-primary-600 mb-4" />
            <h3 className="text-xl font-bold mb-2">Quality Assured</h3>
            <p className="text-gray-600">
              Every product on our platform undergoes thorough verification to ensure 
              it meets our sustainability and quality standards.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <FiAward className="text-4xl text-primary-600 mb-4" />
            <h3 className="text-xl font-bold mb-2">Impact Driven</h3>
            <p className="text-gray-600">
              We measure our success by the positive environmental impact we create 
              through sustainable product transactions.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-primary-50 p-8 rounded-lg text-center"
        >
          <h2 className="text-2xl font-bold mb-4">Join Our Mission</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-6">
            Whether you're a buyer looking for sustainable products or a seller with eco-friendly 
            offerings, GreenFuelMarket is your platform for making a difference.
          </p>
          <button className="btn-primary">Get Started Today</button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AboutPage;