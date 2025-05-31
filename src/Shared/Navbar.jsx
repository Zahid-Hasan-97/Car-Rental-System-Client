import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../Context/AuthContext/AuthContext';

const Navbar = () => {
    const { user, signOutUser } = useContext(AuthContext);

    const handleSignOut = () => {
        signOutUser()
            .then(() => {
                console.log('Successfully signed out');
            })
            .catch(error => {
                console.log('Failed to sign out');
            });
    };

    return (
        <div className="fixed inset-x-0 top-0 z-30 mx-auto w-full max-w-screen-md border border-gray-100 bg-white/80 py-3 shadow backdrop-blur-lg md:top-6 md:rounded-3xl lg:max-w-screen-lg">
            <div className="px-4">
                <div className="flex items-center justify-between">
                    <div className="flex shrink-0">
                        <Link to="/" className="flex items-center">
                            <img className="h-7 w-auto" src="/public/car.png" alt="Logo" />
                        </Link>
                    </div>

                    {/* Navigation Menu */}
                    <div className="hidden md:flex md:items-center md:justify-center md:gap-5">
                        <Link to="/" className="inline-block rounded-lg px-2 py-1 text-sm font-medium text-gray-900 hover:bg-gray-100">
                            Home
                        </Link>
                        <Link to="/availableCars" className="inline-block rounded-lg px-2 py-1 text-sm font-medium text-gray-900 hover:bg-gray-100">
                            Available Cars
                        </Link>

                        {/* Show these options only if user is logged in */}
                        {user && (
                            <>
                                <Link to="/addCar" className="inline-block rounded-lg px-2 py-1 text-sm font-medium text-gray-900 hover:bg-gray-100">
                                    Add Car
                                </Link>
                                <Link to="/myCars" className="inline-block rounded-lg px-2 py-1 text-sm font-medium text-gray-900 hover:bg-gray-100">
                                    My Cars
                                </Link>
                                <Link to="/myBookings" className="inline-block rounded-lg px-2 py-1 text-sm font-medium text-gray-900 hover:bg-gray-100">
                                    My Bookings
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Authentication Section */}
                    <div className="flex items-center justify-end gap-3">
                        {user ? (
                            <div className="flex items-center space-x-4">
                                <h1 className="text-gray-700">{user.displayName}</h1>
                                <img src={user.photoURL} alt="User profile" className="w-8 h-8 rounded-full object-cover" />
                                <button onClick={handleSignOut} className="text-gray-600 hover:text-blue-600">
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <>
                                <Link to="/signin" className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-500">
                                    Log-in
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
