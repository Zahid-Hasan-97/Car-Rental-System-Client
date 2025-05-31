import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAuth from '../../Hooks/useAuth';

const AddCar = () => {
    // const {user} = useContext(AuthContext)
    const { user } = useAuth()

    const [selectedFeatures, setSelectedFeatures] = useState([]);
    const [availableFeatures] = useState([
        "GPS",
        "AC",
        "Bluetooth",
        "Leather Seats",
        "Sunroof",
        "Backup Camera",
        "Cruise Control",
        "Parking Sensors"
    ]);
    const navigate = useNavigate();
    const handleFeatureToggle = (feature) => {
        setSelectedFeatures((prev) =>
            prev.includes(feature)
                ? prev.filter((item) => item !== feature)
                : [...prev, feature]
        );
    };

    const handleAddCar = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const initialData = Object.fromEntries(formData.entries());
        const newCar = {
            ...initialData,
            features: selectedFeatures,
            availability: initialData.availability === "true",
        };
        console.log(newCar);

        fetch('http://localhost:5000/cars', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(newCar),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Car has been added successfully.",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    e.target.reset();
                    setSelectedFeatures([]);
                    navigate('/myCars')
                }
            });
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold mb-8">Add New Car</h2>
            <form onSubmit={handleAddCar} className="max-w-2xl mx-auto space-y-6 bg-white p-8 rounded-lg shadow">
                <div>
                    <label className="block text-sm font-medium mb-2">Car Model*</label>
                    <input
                        type="text"
                        name="model"
                        required
                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">Daily Rental Price ($)*</label>
                    <input
                        name="price"
                        type="number"
                        required
                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">Vehicle Registration Number*</label>
                    <input
                        name="registrationNumber"
                        type="text"
                        required
                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">Location*</label>
                    <input
                        type="text"
                        required
                        name="location"
                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">Image URL*</label>
                    <input
                        type="url"
                        required
                        name="image"
                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="https://example.com/car-image.jpg"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">Features</label>
                    <div className="grid grid-cols-2 gap-4">
                        {availableFeatures.map((feature) => (
                            <label key={feature} className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    checked={selectedFeatures.includes(feature)}
                                    onChange={() => handleFeatureToggle(feature)}
                                    className="rounded text-blue-600 focus:ring-blue-500"
                                />
                                <span>{feature}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">Availability</label>
                    <select
                        name="availability"
                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="true">Available</option>
                        <option value="false">Not Available</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">Description</label>
                    <textarea
                        name="description"
                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        rows="4"
                        required
                    />
                </div>
                <div className='hidden'>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <input
                        name="hr_email"
                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        defaultValue={user?.email}
                        required
                    />
                </div>
                {/* const newUser = {name, email}
                fetch('http://localhost:5000/users', {
                    method: 'POST',
                headers: {
                    'content-type': 'application/json'
                    },
                body: JSON.stringify(newUser)
                }) */}

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                    Add Car
                </button>
            </form>
        </div>
    );
};

export default AddCar;
