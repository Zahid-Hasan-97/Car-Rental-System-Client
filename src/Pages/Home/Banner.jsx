import React from 'react';
import { Link } from 'react-router-dom';

const Banner = () => {
    return (
        <div className='max-w-full'>
            <div className="relative h-screen">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: "url('https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80')"
                    }}
                >
                    <div className="absolute inset-0 bg-black bg-opacity-50" />
                </div>
                <div className="relative h-full flex items-center justify-center text-center px-4">
                    <div>
                        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 shadow-text">
                            Drive Your Dreams Today!
                        </h1>
                        <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition duration-300 transform hover:scale-105">
                            <Link to='availableCars'>View Available Cars</Link>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;