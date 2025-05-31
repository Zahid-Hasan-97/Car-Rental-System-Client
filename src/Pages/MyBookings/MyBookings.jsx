import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useAuth from "../../Hooks/useAuth";

const MyBookings = () => {
    const { user } = useAuth();
    const [bookings, setBookings] = useState([]);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [newDate, setNewDate] = useState(new Date());
    const [showDateModal, setShowDateModal] = useState(false);

    //Fetch user bookings
    // useEffect(() => {
    //     if (user?.email) {
    //         const fetchBookings = async () => {
    //             try {
    //                 const response = await fetch("http://localhost:5000/bookings");
    //                 const data = await response.json();
    //                 setBookings(data);
    //             } catch (error) {
    //                 console.error("Error fetching bookings:", error);
    //             }
    //         };

    //         fetchBookings();

    //     }

    // }, [user?.email]);

    useEffect(() => {
        if (user?.email) {
            fetch(`http://localhost:5000/cars?email=${user.email}`)
                .then((res) => res.json())
                .then((data) => setBookings(data))
                .catch((error) => console.error('Error fetching user cars:', error));
        }
    }, [user?.email]);

    // Cancel Booking
    const handleCancelBooking = async (id) => {
        const confirm = window.confirm("Are you sure you want to cancel this booking?");
        if (confirm) {
            try {
                const response = await fetch(`http://localhost:5000/bookings/${id}`, {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ status: "Canceled" }),
                });

                if (response.ok) {
                    setBookings(bookings.map((b) => (b._id === id ? { ...b, status: "Canceled" } : b)));
                    alert("Booking canceled successfully!");
                }
            } catch (error) {
                console.error("Error canceling booking:", error);
            }
        }
    };

    // Modify Booking Date
    const handleModifyBooking = async () => {
        if (!selectedBooking || !newDate) return;

        try {
            const response = await fetch(`http://localhost:5000/bookings/${selectedBooking._id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ bookingDate: newDate }),
            });

            if (response.ok) {
                setBookings(
                    bookings.map((b) =>
                        b._id === selectedBooking._id ? { ...b, bookingDate: newDate.toISOString() } : b
                    )
                );
                alert("Booking date updated successfully!");
            }
        } catch (error) {
            console.error("Error updating booking:", error);
        }

        setShowDateModal(false);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold text-center mb-8">My Bookings</h2>

            <table className="w-full text-left border-collapse shadow-md">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border p-4">Car Image</th>
                        <th className="border p-4">Car Model</th>
                        <th className="border p-4">Booking Date</th>
                        <th className="border p-4">Total Price</th>
                        <th className="border p-4">Status</th>
                        <th className="border p-4">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {bookings.map((booking) => (
                        <tr key={booking._id}>
                            <td className="border p-4">
                                <img src={booking.carImage} alt={booking.carModel} className="w-16 h-16 rounded-md" />
                            </td>
                            <td className="border p-4">{booking.carModel}</td>
                            <td className="border p-4">{new Date(booking.bookingDate).toLocaleString()}</td>
                            <td className="border p-4">${booking.price}</td>
                            <td className="border p-4 font-bold">
                                {booking.status === "Canceled" ? (
                                    <span className="text-red-500">Canceled</span>
                                ) : (
                                    <span className="text-green-500">{booking.status}</span>
                                )}
                            </td>
                            <td className="border p-4 flex space-x-2">
                                {booking.status !== "Canceled" && (
                                    <>
                                        {/* Cancel Booking Button */}
                                        <button
                                            onClick={() => handleCancelBooking(booking._id)}
                                            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                                        >
                                            🗑 Cancel
                                        </button>

                                        {/* Modify Date Button */}
                                        <button
                                            onClick={() => {
                                                setSelectedBooking(booking);
                                                setNewDate(new Date(booking.bookingDate)); // Set initial date
                                                setShowDateModal(true);
                                            }}
                                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                                        >
                                            📅 Modify Date
                                        </button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modify Booking Date Modal */}
            {showDateModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg">
                        <h3 className="text-lg font-semibold mb-4">Modify Booking Date</h3>
                        <DatePicker
                            selected={newDate}
                            onChange={(date) => setNewDate(date)}
                            showTimeSelect
                            dateFormat="dd-MM-yyyy HH:mm"
                            className="border p-2 rounded-md w-full"
                        />
                        <div className="flex justify-end space-x-4 mt-4">
                            <button onClick={() => setShowDateModal(false)} className="bg-gray-300 px-4 py-2 rounded-md">
                                Cancel
                            </button>
                            <button onClick={handleModifyBooking} className="bg-blue-500 text-white px-4 py-2 rounded-md">
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyBookings;
