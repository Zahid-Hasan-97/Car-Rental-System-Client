import React, { useEffect, useState } from 'react';
import { FaCalendar, FaTrash } from 'react-icons/fa';
import useAuth from '../../Hooks/useAuth';
import Swal from 'sweetalert2';

const MyCars = () => {
    const [cars, setCars] = useState([]);
    const { user } = useAuth();
    const [selectedCar, setSelectedCar] = useState(null);
    const [showModifyModal, setShowModifyModal] = useState(false);

    useEffect(() => {
        if (user?.email) {
            fetch(`http://localhost:5000/cars?email=${user.email}`)
                .then((res) => res.json())
                .then((data) => setCars(data))
                .catch((error) => console.error('Error fetching user cars:', error));
        }
        console.log(cars)
    }, [user?.email]);

    const handleDelete = (_id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:5000/cars/${_id}`, {
                    method: "DELETE",
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount > 0) {
                            Swal.fire("Deleted!", "Your car has been deleted.", "success");
                            setCars(cars.filter((car) => car._id !== _id));
                        } else {
                            Swal.fire("Error!", "Could not delete the car.", "error");
                        }
                    })
                    .catch(error => {
                        console.error('Error deleting car:', error);
                        Swal.fire("Error!", "Something went wrong.", "error");
                    });
            }
        });
    };

    const handleModify = (car) => {
        setSelectedCar(car);
        setShowModifyModal(true);
    };

    const handleModifySubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const updatedCar = {
            model: form.model.value,
            price: parseFloat(form.price.value),
            availability: form.availability.value === 'true',
            registrationNumber: form.registrationNumber.value,
            features: form.features.value.split(',').map(feature => feature.trim()),
            description: form.description.value,
            image: form.image.value,
            location: form.location.value,
        };

        // Validation
        if (!updatedCar.model || !updatedCar.price || !updatedCar.registrationNumber) {
            Swal.fire("Error!", "Model, Price, and Registration Number are required.", "error");
            return;
        }

        if (isNaN(updatedCar.price) || updatedCar.price <= 0) {
            Swal.fire("Error!", "Please enter a valid price.", "error");
            return;
        }

        fetch(`http://localhost:5000/cars/${selectedCar._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedCar),
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    Swal.fire("Success!", "Car details updated successfully.", "success");
                    setCars(cars.map(car =>
                        car._id === selectedCar._id ? { ...car, ...updatedCar } : car
                    ));
                    setShowModifyModal(false);
                } else {
                    Swal.fire("Error!", "No changes were made.", "warning");
                }
            })
            .catch(error => {
                console.error('Error updating car:', error);
                Swal.fire("Error!", "Failed to update car.", "error");
            });
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'pending':
                return 'bg-yellow-100 text-yellow-800';
            case 'confirmed':
                return 'bg-green-100 text-green-800';
            case 'canceled':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">My Cars</h1>

            <div className="overflow-x-auto bg-white rounded-lg shadow">
                <table className="min-w-full table-auto">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Car</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Model</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Added Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rental Price</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Availability</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {cars.map((car, index) => (
                            <tr
                                key={car._id}
                                className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-gray-100`}
                            >
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <img
                                        src={car.image}
                                        alt={car.model}
                                        className="h-12 w-16 object-cover rounded"
                                        onError={(e) => {
                                            e.target.src = 'https://via.placeholder.com/150';
                                        }}
                                    />
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">{car.model}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {new Date(car.addedDate).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">${car.price}</td>
                                <td className={`px-6 py-4 whitespace-nowrap rounded-full text-sm font-semibold ${car.availability
                                    ? 'bg-green-500 text-white'
                                    : 'bg-red-500 text-white'
                                    }`}>
                                    {car.availability ? 'Available' : 'Unavailable'}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <button
                                        onClick={() => handleModify(car)}
                                        className="mr-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                                    >
                                        <FaCalendar className="mr-2" />
                                        Modify
                                    </button>
                                    <button
                                        onClick={() => handleDelete(car._id)}
                                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
                                    >
                                        <FaTrash className="mr-2" />
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modify Modal */}
            {showModifyModal && selectedCar && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
                    <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Modify Car</h3>
                        <form onSubmit={handleModifySubmit}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Car Model</label>
                                <input type="text" name="model" defaultValue={selectedCar.model} className="mt-1 block w-full border rounded-md p-2" required />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Daily Rental Price ($)</label>
                                <input type="number" name="price" defaultValue={selectedCar.price} step="0.01" className="mt-1 block w-full border rounded-md p-2" required />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Availability</label>
                                <select name="availability" defaultValue={selectedCar.availability} className="mt-1 block w-full border rounded-md p-2">
                                    <option value="true">Available</option>
                                    <option value="false">Unavailable</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Registration Number</label>
                                <input type="text" name="registrationNumber" defaultValue={selectedCar.registrationNumber || ''} className="mt-1 block w-full border rounded-md p-2" required />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Features (comma-separated)</label>
                                <input type="text" name="features" defaultValue={selectedCar.features?.join(', ') || ''} className="mt-1 block w-full border rounded-md p-2" />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Description</label>
                                <textarea name="description" defaultValue={selectedCar.description || ''} className="mt-1 block w-full border rounded-md p-2" />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Image URL</label>
                                <input type="url" name="image" defaultValue={selectedCar.image} className="mt-1 block w-full border rounded-md p-2" />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Location</label>
                                <input type="text" name="location" defaultValue={selectedCar.location || ''} className="mt-1 block w-full border rounded-md p-2" />
                            </div>
                            <div className="flex justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={() => setShowModifyModal(false)}
                                    className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyCars;