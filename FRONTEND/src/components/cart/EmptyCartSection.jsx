import React from 'react';

const EmptyCartSection = () => (
    <div className="text-center py-12">
        <div className="mx-auto h-16 w-16 text-gray-400">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-full h-full">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.35 2.7A2 2 0 007.48 19h8.04a2 2 0 001.83-1.3L17 13M7 13V6h10v7" />
            </svg>
        </div>
        <h2 className="text-2xl font-bold mb-4 mt-4">Your Cart is Empty</h2>
        <p className="mb-8 text-gray-600">Add some products to your cart and they will appear here.</p>
        <a href="/marketplace" className="btn-primary flex items-center justify-center max-w-xs mx-auto">
            Continue Shopping
        </a>
    </div>
);

export default EmptyCartSection; 