import React from 'react';
import { FaBookOpen, FaCar, FaHeadset, FaMoneyBillWave } from 'react-icons/fa';

const WhyChoose = () => {
    return (
        <div className="container mx-auto px-4 py-20">
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="text-center space-y-4">
                    <FaCar className="text-5xl mx-auto text-blue-600" />
                    <h3 className="text-xl font-semibold">Variety of Cars</h3>
                    <p>Choose from our wide selection of premium vehicles</p>
                </div>
                <div className="text-center space-y-4">
                    <FaMoneyBillWave className="text-5xl mx-auto text-blue-600" />
                    <h3 className="text-xl font-semibold">Affordable Prices</h3>
                    <p>Competitive rates for all our vehicles</p>
                </div>
                <div className="text-center space-y-4">
                    <FaBookOpen className="text-5xl mx-auto text-blue-600" />
                    <h3 className="text-xl font-semibold">Easy Booking</h3>
                    <p>Simple and quick booking process</p>
                </div>
                <div className="text-center space-y-4">
                    <FaHeadset className="text-5xl mx-auto text-blue-600" />
                    <h3 className="text-xl font-semibold">24/7 Support</h3>
                    <p>Round-the-clock customer service</p>
                </div>
            </div>
        </div>
    );
};

export default WhyChoose;