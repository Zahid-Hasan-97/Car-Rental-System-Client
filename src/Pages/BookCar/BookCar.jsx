import { useParams } from "react-router-dom";

const BookCar = () => {
    const { id } = useParams();

    console.log("Booking car with ID:", id); // Debugging
    return <div>Booking Car {id}</div>;
};

export default BookCar;
