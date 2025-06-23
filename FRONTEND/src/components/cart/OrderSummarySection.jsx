import React from 'react';

const OrderSummarySection = ({ cartTotal, handleCheckout, isProcessing }) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
            <div className="border-t border-gray-200 pt-4 pb-2">
                <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="text-gray-900 font-medium">₹{cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Shipping</span>
                    <span className="text-gray-900 font-medium">₹5.99</span>
                </div>
                <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Tax (18%)</span>
                    <span className="text-gray-900 font-medium">₹{(cartTotal * 0.18).toFixed(2)}</span>
                </div>
            </div>
            <div className="border-t border-gray-200 pt-4 mt-2">
                <div className="flex justify-between mb-4">
                    <span className="text-lg font-semibold">Total</span>
                    <span className="text-xl font-semibold text-primary-600">
                        ₹{(cartTotal + 5.99 + (cartTotal * 0.18)).toFixed(2)}
                    </span>
                </div>
                <button
                    onClick={handleCheckout}
                    disabled={isProcessing}
                    className="w-full btn-primary py-3 flex items-center justify-center"
                >
                    {isProcessing ? 'Processing...' : 'Proceed to Checkout'}
                </button>
                <p className="text-xs text-gray-500 mt-4 text-center">
                    By proceeding to checkout, you agree to our terms and conditions.
                </p>
            </div>
        </div>
    );
};

export default OrderSummarySection; 