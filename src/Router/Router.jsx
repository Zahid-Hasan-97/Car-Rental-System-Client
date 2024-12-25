import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home/Home";
import Register from "../Pages/Register/Register";
import SignIn from "../Pages/SignIn/SignIn";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout> ,
        errorElement: <h2>Route Not found</h2>,
        children:[
            {
                path:'/',
                element: <Home></Home>,
            },
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