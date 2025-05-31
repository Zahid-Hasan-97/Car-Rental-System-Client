import React from 'react';

const RecentCarsCard = ({ car }) => {
    const { _id, model, price, image, available, posted } = car
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            <div className=" sm:grid-cols-2 lg:grid-cols-3 gap-8">
                <div key={car.id} className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105">
                    <div className="relative h-48">
                        <img src={car.image} alt={car.model} className="w-full h-full object-cover" />
                        {/* <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-semibold ${car.available ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                                {car.available ? "Available" : "Rented"}
                            </div> */}
                    </div>
                    <div className="p-6">
                        <h3 className="text-xl font-semibold mb-2">{car.model}</h3>
                        <div className="flex justify-between items-center">
                            <p className="text-2xl font-bold text-blue-600">${car.price}/day</p>
                            <p className="text-sm text-gray-500">Posted: {car.posted}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecentCarsCard;