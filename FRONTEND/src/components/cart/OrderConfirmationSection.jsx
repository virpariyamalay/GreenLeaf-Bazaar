import React from 'react';
import OrderSummary from '../../components/checkout/OrderSummary';

const OrderConfirmationSection = ({ cartItems, cartTotal, deliveryDetails }) => (
    <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Order Confirmation</h1>
        <OrderSummary
            items={cartItems}
            total={cartTotal}
            deliveryDetails={deliveryDetails}
        />
        <div className="mt-8 text-center">
            <a href="/marketplace" className="btn-primary">
                Continue Shopping
            </a>
        </div>
    </div>
);

export default OrderConfirmationSection; 