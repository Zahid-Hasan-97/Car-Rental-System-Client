import {
    createBrowserRouter,
} from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home/Home";
import Register from "../Pages/Register/Register";
import SignIn from "../Pages/SignIn/SignIn";
import CarDetails from "../Pages/CarDetails/CarDetails";
import AvailableCars from "../Pages/AvailableCars/AvailableCars";
import PrivateRoute from "./PrivateRoute";

import AddCar from "../Pages/AddCar/AddCar";
import MyCars from "../Pages/MyCars/MyCars";
import MyBookings from "../Pages/MyBookings/MyBookings";
import BookCar from "../Pages/BookCar/BookCar";
// import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        errorElement: <h2>Route Not found</h2>,
        children: [
            {
                path: '/',
                element: <Home></Home>,
            },
            {
                path: 'availableCars',
                element: <AvailableCars></AvailableCars>,
                loader: () => fetch('http://localhost:5000/cars')
            },
            {
                path: 'addCar',
                element: <AddCar></AddCar>,
            },
            {
                path: 'myCars',
                element: <MyCars></MyCars>,
            },
            {
                path: '/myBookings',
                element: <MyBookings></MyBookings>,
            },
            {
                path: '/cars/:id',
                element: <CarDetails></CarDetails>,
                loader: ({ params }) => fetch(`http://localhost:5000/cars/${params.id}`)
            },
            // {
            //     path: '/bookCar/:id',
            //     element: <BookCar></BookCar>,
            // },
            {
                path: 'register',
                element: <Register></Register>
            },
            {
                path: 'signin',
                element: <SignIn></SignIn>
            }
        ]
    },
]);

export default router;