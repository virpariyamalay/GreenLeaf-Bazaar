import { motion } from 'framer-motion';

const OrderSummary = ({ items, total, deliveryDetails }) => {
  const today = new Date();
  const orderDate = today.toLocaleDateString('en-IN');
  const tax = total * 0.18;
  const shipping = 5.99;
  const companyCharges = total * 0.08; // 8% company charges
  const finalTotal = total + tax + shipping + companyCharges;
  const orderNumber = `${Math.floor(Math.random() * 900000) + 100000}${Math.floor(Math.random() * 900000) + 100000}`;
  const transactionId = `pay_${Math.random().toString(36).substr(2, 12).toUpperCase()}`;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-8 rounded-lg shadow-lg max-w-4xl mx-auto"
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-8 border-b border-gray-200 pb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">GreenFuel Market</h1>
          <div className="text-sm text-gray-600">
            <div className="mb-1">Invoice #{orderNumber}</div>
            <div>Date: {orderDate}</div>
          </div>
        </div>
        <button className="text-gray-400 hover:text-gray-600">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Delivery and Payment Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Delivery Details */}
        <div>
          <h3 className="font-bold text-gray-800 mb-4 text-lg">Delivery Details:</h3>
          {deliveryDetails ? (
            <div className="text-gray-600 space-y-2">
              <p className="font-medium">{deliveryDetails.fullName}</p>
              <p>{deliveryDetails.address}</p>
              <p>{deliveryDetails.city}, {deliveryDetails.state}</p>
              <p>{deliveryDetails.pincode}</p>
              <p>India</p>
              <p>Phone: {deliveryDetails.phone}</p>
              <p>Email: {deliveryDetails.email}</p>
            </div>
          ) : (
            <div className="text-gray-600 space-y-2">
              <p className="font-medium">Customer Name</p>
              <p>Delivery Address</p>
              <p>City, State</p>
              <p>Pincode</p>
              <p>India</p>
              <p>Phone: Not provided</p>
              <p>Email: Not provided</p>
            </div>
          )}
        </div>

        {/* Payment Details */}
        <div>
          <h3 className="font-bold text-gray-800 mb-4 text-lg">Payment Details:</h3>
          <div className="text-gray-600 space-y-2">
            <p><span className="text-blue-600">Payment Method:</span> Online Payment</p>
            <p><span className="text-blue-600">Status:</span> Paid</p>
            <p><span className="text-blue-600">Transaction ID:</span> {transactionId}</p>
          </div>
        </div>
      </div>

      {/* Items Table */}
      <div className="mb-8">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-gray-300">
              <th className="text-left py-3 px-2 font-bold text-gray-700">Item</th>
              <th className="text-center py-3 px-2 font-bold text-gray-700">Quantity</th>
              <th className="text-right py-3 px-2 font-bold text-gray-700">Price</th>
              <th className="text-right py-3 px-2 font-bold text-gray-700">Total</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={item.id} className="border-b border-gray-200">
                <td className="py-4 px-2">
                  <div className="font-medium text-gray-900">{item.name}</div>
                </td>
                <td className="py-4 px-2 text-center">{item.quantity}</td>
                <td className="py-4 px-2 text-right">₹{item.price.toFixed(2)}</td>
                <td className="py-4 px-2 text-right font-medium">₹{(item.price * item.quantity).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Totals Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Left side - Payment Status */}
        <div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h3 className="font-bold text-green-800 mb-2">Payment Status</h3>
            <div className="flex items-center text-green-700">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="font-medium">Payment Successful</span>
            </div>
            <p className="text-sm text-green-600 mt-1">Your order has been confirmed</p>
          </div>
        </div>




        {/* Right side - Totals */}
        <div>
          <div className="space-y-3">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal:</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>GST (18%):</span>
              <span> ₹{(total * 0.18).toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Company Charges (8%):</span>
              <span> ₹{(total * 0.08).toFixed(2)}</span>
            </div>
            <div className="border-t border-gray-300 pt-3">
              <div className="flex justify-between font-bold text-xl text-gray-900">
                <span>Total:</span>
                <span>₹{(total + (total * 0.08) + (total * 0.18) + 5.99).toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-200 pt-6 text-center">
        <p className="text-gray-600 mb-2">Thank you for shopping with GreenFuel Market!</p>
        <p className="text-sm text-gray-500">For any queries, please contact support@greenfuelmarket.com</p>

        <div className="flex justify-center space-x-4 mt-6">
          <button className="flex items-center px-6 py-2 border border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition-colors">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Download Bill
          </button>
          <button className="flex items-center px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            Continue Shopping
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default OrderSummary;