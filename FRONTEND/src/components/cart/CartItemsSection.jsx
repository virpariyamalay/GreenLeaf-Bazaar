import React from 'react';

const CartItemsSection = ({ cartItems, updateQuantity, removeFromCart, clearCart }) => {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="divide-y divide-gray-200">
                {cartItems.map((item) => (
                    <div key={item.id} className="p-6 flex flex-col sm:flex-row animate-fade-in">
                        <div className="sm:w-24 sm:h-24 flex-shrink-0 mb-4 sm:mb-0">
                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-cover rounded-md"
                            />
                        </div>
                        <div className="flex-1 sm:ml-6">
                            <div className="flex flex-col sm:flex-row sm:justify-between mb-4">
                                <div>
                                    <a href={`/product/${item.id}`} className="text-lg font-semibold text-gray-900 hover:text-primary-600">
                                        {item.name}
                                    </a>
                                    <p className="text-sm text-gray-500 mt-1">{item.category}</p>
                                </div>
                                <div className="text-right">
                                    <div className="font-medium">₹{(item.price * item.quantity).toFixed(2)}</div>
                                    <div className="text-sm text-gray-600">₹{item.price.toFixed(2)} each</div>
                                </div>
                            </div>
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                                <div className="flex items-center">
                                    <label className="mr-2 text-sm text-gray-700">Qty:</label>
                                    <select
                                        value={item.quantity}
                                        onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                                        className="border-gray-300 rounded-md shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-500 focus:ring-opacity-50 text-sm"
                                    >
                                        {[...Array(10).keys()].map((x) => (
                                            <option key={x + 1} value={x + 1}>
                                                {x + 1}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <button
                                    onClick={() => removeFromCart(item.id)}
                                    className="text-red-600 hover:text-red-800 flex items-center text-sm mt-2 sm:mt-0"
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="mt-6 flex justify-between">
                <a href="/marketplace" className="btn-outline flex items-center">
                    Continue Shopping
                </a>
                <button onClick={clearCart} className="text-red-600 hover:text-red-800">
                    Clear Cart
                </button>
            </div>
        </div>
    );
};

export default CartItemsSection; 