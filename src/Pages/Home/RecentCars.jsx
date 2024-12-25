import React, { useEffect, useState } from 'react';
import RecentCarsCard from './RecentCarsCard';

const RecentCars = () => {
    const [cars, setCars] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/cars')
        .then(res => res.json())
        .then(data => setCars(data))
    }, [])


    return (
        <div>
            <div className='grid grid-cols-3'>
                {
                    cars.map(car => <RecentCarsCard key={car._id} car={car}></RecentCarsCard>)
                }
            </div>
        </div>
    );
};

export default RecentCars;