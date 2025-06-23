import React from 'react';

const LoginPromptSection = () => (
    <div className="text-center py-12">
        <div className="mx-auto h-16 w-16 text-gray-400">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-full h-full">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 15c2.485 0 4.797.657 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
        </div>
        <h2 className="text-2xl font-bold mb-4 mt-4">Please Login to View Your Cart</h2>
        <p className="mb-8 text-gray-600">You need to be logged in to access your shopping cart.</p>
        <div className="flex justify-center space-x-4">
            <a href="/login" className="btn-primary">Login</a>
            <a href="/register" className="btn-outline">Register</a>
        </div>
    </div>
);

export default LoginPromptSection; 