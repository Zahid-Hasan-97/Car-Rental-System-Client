import React, { useState } from 'react';
import { FaCalendarAlt, FaList, FaSearch, FaSort, FaTh } from 'react-icons/fa';
import { useLoaderData, useNavigate, useParams } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';
import Swal from 'sweetalert2';

const AvailableCars = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();
    const cars = useLoaderData();
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOption, setSortOption] = useState('newest');
    const [viewMode, setViewMode] = useState('grid');

    // const handleBookCar = (car) => {
    //     if (!user) {
    //         Swal.fire({
    //             icon: 'info',
    //             title: 'Login Required',
    //             text: 'Please log in to book a car.',
    //         });
    //         navigate('/login'); // Redirect to login page
    //         return;
    //     }
    //     const bookingData = {
    //         carId: car._id,        // Use car._id (MongoDB uses _id)
    //         userEmail: user.email, // Use user's email (more reliable than userId)
    //         bookingDate: new Date().toISOString(), // Current date/time
    //         price: car.price,
    //         carImage: car.image,
    //         carModel: car.model,
    //         carBrand: car.brand,   // Added brand (good to have)
    //         carLocation: car.location //added car location
    //         // Add any other fields you need in your booking document
    //     };

    //     console.log("Booking data:", bookingData); // Log for debugging

    //     fetch('http://localhost:5000/bookings', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(bookingData),
    //     })
    //         .then((res) => {
    //             if (!res.ok) {
    //                 throw new Error(`HTTP error! Status: ${res.status}`); // Handle non-2xx responses
    //             }
    //             return res.json();
    //         })
    //         .then((data) => {
    //             // Check for a success indicator (adjust this based on your backend)
    //             if (data.insertedId) { // Assuming your backend returns { insertedId: ... } on success
    //                 Swal.fire({
    //                     position: "top-end",
    //                     icon: "success",
    //                     title: "Car has been booked successfully.",
    //                     showConfirmButton: false,
    //                     timer: 1500,
    //                 });
    //                 navigate('/myBookings'); // Redirect to a "My Bookings" page
    //             } else {
    //                 // Handle the case where the booking was *not* successful
    //                 Swal.fire({
    //                     icon: 'error',
    //                     title: 'Booking Failed',
    //                     text: data.message || 'An unexpected error occurred.', // Use server message if available
    //                 });
    //             }
    //         })
    //         .catch((error) => {
    //             console.error('Error booking car:', error);
    //             Swal.fire({
    //                 icon: 'error',
    //                 title: 'Error',
    //                 text: `Failed to book car: ${error.message}`,
    //             });
    //         });
    // }

    const handleBookCar = (car) => {
        if (!user) {
            Swal.fire({
                icon: 'info',
                title: 'Login Required',
                text: 'Please log in to book a car.',
            });
            navigate('/login');
            return;
        }

        const bookingData = {
            carId: car._id,
            userEmail: user.email, // Match the backend field name
            bookingDate: new Date().toISOString(),
            price: car.price,
            carImage: car.image,
            carModel: car.model,
            carBrand: car.brand,
            carLocation: car.location,
        };

        fetch('http://localhost:5000/bookings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include', // Include cookies (for JWT token)
            body: JSON.stringify(bookingData),
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`HTTP error! Status: ${res.status}`);
                }
                return res.json();
            })
            .then((data) => {
                if (data.insertedId) {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Car has been booked successfully.',
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    navigate('/myBookings');
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Booking Failed',
                        text: data.message || 'An unexpected error occurred.',
                    });
                }
            })
            .catch((error) => {
                console.error('Error booking car:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: `Failed to book car: ${error.message}`,
                });
            });
    };


    // Filter cars based on search term and availability
    const getFilteredCars = () => {
        return cars.filter((car) => {
            const searchValue = searchTerm.toLowerCase();
            return (
                car.available &&
                (car.model.toLowerCase().includes(searchValue) ||
                    (car.brand && car.brand.toLowerCase().includes(searchValue)) ||
                    (car.location && car.location.toLowerCase().includes(searchValue)))
            );
        });
    };

    // Sort filtered cars based on sort option
    const getSortedCars = (filteredCars) => {
        const sortedCars = [...filteredCars];
        switch (sortOption) {
            case 'newest':
                return sortedCars.sort(
                    (a, b) => new Date(b.posted || 0) - new Date(a.posted || 0)
                );
            case 'oldest':
                return sortedCars.sort(
                    (a, b) => new Date(a.posted || 0) - new Date(b.posted || 0)
                );
            case 'lowPrice':
                return sortedCars.sort((a, b) => a.price - b.price);
            case 'highPrice':
                return sortedCars.sort((a, b) => b.price - a.price);
            default:
                return sortedCars;
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold text-center mb-8">Available Cars</h2>
            <div className="mb-8 space-y-4">
                <div className="max-w-xl mx-auto flex items-center gap-4">
                    {/* Search Input */}
                    <div className="flex-1 flex items-center bg-gray-500 rounded-lg shadow-sm">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="flex-1 p-4 rounded-l-lg focus:outline-none"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button className="p-4 bg-gray-500 text-white rounded-r-lg hover:bg-gray-700">
                            <FaSearch />
                        </button>
                    </div>
                    {/* View Mode Toggle */}
                    <div className="flex gap-2 bg-white rounded-lg shadow-sm p-2">
                        <button
                            onClick={() => setViewMode('grid')}
                            className={`p-2 rounded ${viewMode === 'grid' ? 'bg-gray-600 text-white' : 'text-gray-600'}`}
                        >
                            <FaTh />
                        </button>
                        <button
                            onClick={() => setViewMode('list')}
                            className={`p-2 rounded ${viewMode === 'list' ? 'bg-gray-600 text-white' : 'text-gray-600'}`}
                        >
                            <FaList />
                        </button>
                    </div>
                </div>

                {/* Sort Options */}
                <div className="max-w-xl mx-auto flex justify-center gap-4">
                    <select
                        value={sortOption}
                        onChange={(e) => setSortOption(e.target.value)}
                        className="p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="newest">Newest First</option>
                        <option value="oldest">Oldest First</option>
                        <option value="lowPrice">Price: Low to High</option>
                        <option value="highPrice">Price: High to Low</option>
                    </select>
                    <div className="flex items-center text-gray-600">
                        <FaSort className="mr-2" />
                        Sort by
                    </div>
                </div>
            </div>

            {/* Display Cars */}
            {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {getSortedCars(getFilteredCars()).map((car) => (
                        <div
                            key={car.id}
                            className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105"
                        >
                            <div className="relative">
                                <img
                                    src={car.image}
                                    alt={car.model}
                                    className="w-full h-48 object-cover"
                                    onError={(e) => {
                                        e.target.src =
                                            'https://images.unsplash.com/photo-1511919884226-fd3cad34687c';
                                    }}
                                />
                                <div className="absolute top-4 right-4">
                                    <span
                                        className={`px-3 py-1 rounded-full text-sm font-semibold ${car.available
                                            ? 'bg-green-500 text-white'
                                            : 'bg-red-500 text-white'
                                            }`}
                                    >
                                        {car.available ? 'Available' : 'Unavailable'}
                                    </span>
                                </div>
                            </div>
                            <div className="p-6">
                                <h2 className="text-xl font-bold text-gray-900 mb-2">
                                    {car.model}
                                </h2>
                                <p className="text-2xl font-bold text-blue-600 mb-4">
                                    ${car.price}/day
                                </p>
                                <div className="flex items-center text-gray-600">
                                    <FaCalendarAlt className="mr-2" />
                                    <span className="text-sm">
                                        Posted on{' '}
                                        {car.posted
                                            ? new Date(car.posted).toLocaleDateString()
                                            : 'N/A'}
                                    </span>
                                </div>
                            </div>
                            <div className="px-6 py-4 bg-gray-50">
                                <button
                                    // onClick={() => handleBookNow(car)}
                                    onClick={() => handleBookCar(car)}
                                    className={`w-full py-2 px-4 rounded-md font-semibold transition duration-300 ${car.available
                                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                                        : 'bg-gray-400 text-white cursor-not-allowed'
                                        }`}
                                    disabled={!car.available}
                                >
                                    {car.available ? 'Book Now' : 'Not Available'}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="space-y-4">
                    {getSortedCars(getFilteredCars()).map((car) => (
                        <div key={car.id} className="bg-white rounded-lg shadow-lg overflow-hidden flex">
                            <img
                                src={car.image}
                                alt={car.model}
                                className="w-64 h-full object-cover"
                                onError={(e) => {
                                    e.target.src =
                                        'https://images.unsplash.com/photo-1511919884226-fd3cad34687c';
                                }}
                            />
                            <div className="p-6 flex-1 flex flex-col justify-between">
                                <div>
                                    <h3 className="text-xl font-semibold mb-2">{car.model}</h3>
                                    <p className="text-gray-600 mb-4">
                                        {car.brand} • {car.location}
                                    </p>
                                    <p className="text-gray-500">
                                        Posted on{' '}
                                        {car.posted
                                            ? new Date(car.posted).toLocaleDateString()
                                            : 'N/A'}
                                    </p>
                                </div>
                                <div className="flex justify-between items-center">
                                    <p className="text-2xl font-bold text-blue-600">
                                        ${car.price}/day
                                    </p>
                                    <div className="space-x-4">
                                        <span className="px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
                                            Available Now
                                        </span>
                                        <button
                                            name="hr_email"
                                            defaultValue={user?.email}
                                            required
                                            // onClick={() => handleBookNow(car)}
                                            onClick={() => handleBookCar(car)}
                                            className={`px-6 py-2 rounded-lg text-white transition-colors ${car.available
                                                ? 'bg-blue-600 hover:bg-blue-700'
                                                : 'bg-gray-400 cursor-not-allowed'
                                                }`}
                                            disabled={!car.available}
                                        >
                                            {car.available ? 'Book Now' : 'Not Available'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AvailableCars;