import React from 'react';
import { FaCar } from 'react-icons/fa';
import { Link, useLoaderData } from 'react-router-dom';

const CarDetails = () => {
    const {_id, model, price, image, available, posted, brand, location, features, description} = useLoaderData();
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="md:flex">
                    <div className="md:w-1/2">
                        <img
                            src={image}
                            alt={model}
                            className="w-full h-[400px] object-cover"
                        />
                    </div>
                    <div className="md:w-1/2 p-8">
                        <h2 className="text-3xl font-bold mb-4">{model}</h2>
                        <div className="mb-6">
                            <p className="text-gray-600 mb-2">{brand} • {location}</p>
                            <p className="text-3xl font-bold text-blue-600">${price}/day</p>
                        </div>
                        <div className="mb-6">
                            <h3 className="text-xl font-semibold mb-3">Description</h3>
                            <p className="text-gray-600">{description}</p>
                        </div>
                        <div className="mb-8">
                            <h3 className="text-xl font-semibold mb-3">Features</h3>
                            <div className="grid grid-cols-2 gap-4">
                                {features.map((feature, index) => (
                                    <div key={index} className="flex items-center text-gray-600">
                                        <FaCar className="mr-2 text-blue-600" />
                                        {feature}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <Link to={`/bookCar/${_id}`}>
                            <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors">
                                Confirm Booking
                            </button>
                        </Link>
                        
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CarDetails;
