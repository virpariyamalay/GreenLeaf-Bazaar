import React from 'react';
import CheckoutForm from '../../components/checkout/CheckoutForm';

const CheckoutFormSection = ({ cartItems, cartTotal, onSubmit, onBack }) => (
    <div className="max-w-2xl mx-auto">
        <div className="flex items-center mb-6">
            <button
                onClick={onBack}
                className="flex items-center text-gray-600 hover:text-primary-600 transition-colors"
            >
                Back to Cart
            </button>
        </div>
        <CheckoutForm
            cartItems={cartItems}
            cartTotal={cartTotal}
            onSubmit={onSubmit}
        />
    </div>
);

export default CheckoutFormSection; 