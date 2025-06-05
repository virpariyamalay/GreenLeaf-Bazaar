import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown, FiHelpCircle } from 'react-icons/fi';

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200">
      <button
        className="w-full py-6 flex justify-between items-center focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-lg font-medium text-gray-900">{question}</span>
        <FiChevronDown
          className={`w-5 h-5 text-gray-500 transform transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="pb-6 text-gray-600">{answer}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQPage = () => {
  const faqs = [
    {
      question: "What is GreenFuelMarket?",
      answer: "GreenFuelMarket is a specialized marketplace connecting buyers with verified sellers of sustainable and eco-friendly products. We focus on renewable energy solutions, raw materials, and environmentally conscious products."
    },
    {
      question: "How do you verify sellers?",
      answer: "All sellers undergo a thorough verification process, including business documentation review, sustainability practices assessment, and product quality evaluation. We verify their credentials, including GST, PAN, and other business details."
    },
    {
      question: "What types of products can I find?",
      answer: "Our marketplace features various categories including raw materials, biofuels, renewable energy products, and eco-friendly consumer goods. All products must meet our sustainability criteria."
    },
    {
      question: "How do I become a seller?",
      answer: "To become a seller, register an account, provide required business documentation (GST, PAN, etc.), and submit your products for approval. Our team will review your application and guide you through the process."
    },
    {
      question: "Is my payment information secure?",
      answer: "Yes, we use industry-standard encryption and secure payment gateways to protect your financial information. All transactions are processed through verified and secure channels."
    },
    {
      question: "What is your return policy?",
      answer: "Our return policy varies by product category. Generally, we offer a 7-day return window for eligible products. Specific terms are provided on each product page and during checkout."
    },
    {
      question: "How do you ensure product quality?",
      answer: "Each product undergoes a verification process before listing. We check sustainability claims, quality certifications, and seller credentials. We also maintain a review system for buyer feedback."
    },
    {
      question: "Do you ship internationally?",
      answer: "Currently, we focus on domestic shipping within India. International shipping is available for select products and locations, subject to additional terms and conditions."
    }
  ];

  return (
    <div className="py-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="container-custom"
      >
        <div className="text-center mb-12">
          <FiHelpCircle className="w-16 h-16 text-primary-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about GreenFuelMarket, our products, and services.
            Can't find what you're looking for? Contact our support team.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            {faqs.map((faq, index) => (
              <FAQItem key={index} question={faq.question} answer={faq.answer} />
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-12 text-center"
          >
            <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
            <p className="text-gray-600 mb-6">
              Our team is here to help. Contact us for any additional questions or concerns.
            </p>
            <button className="btn-primary">Contact Support</button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default FAQPage;