import { useState, useEffect } from 'react';

import { Link } from 'components';
import { carService } from 'services';

export default Index;

function Index() {
    const [cars, setCars] = useState(null);

    useEffect(() => {
        carService.getAll().then(x => setCars(x));
    }, []);

    function deleteCar(id) {
        setCars(cars.map(x => {
            if (x.id === id) { x.isDeleting = true; }
            return x;
        }));
        carService.delete(id).then(() => {
            setCars(cars => cars.filter(x => x.id !== id));
        });
    }

    return (
        <div>
            <h1>Cars</h1>
            <Link href="/cars/add" className="btn btn-sm btn-success mb-2">Add Car</Link>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th style={{ width: '30%' }}>Name</th>
                        <th style={{ width: '30%' }}>Email</th>
                        <th style={{ width: '30%' }}>Role</th>
                        <th style={{ width: '10%' }}></th>
                    </tr>
                </thead>
                <tbody>
                    {cars && cars.map(car =>
                        <tr key={car.id}>
                            <td>{car.title} {car.firstName} {car.lastName}</td>
                            <td>{car.email}</td>
                            <td>{car.role}</td>
                            <td style={{ whiteSpace: 'nowrap' }}>
                                <Link href={`/cars/edit/${car.id}`} className="btn btn-sm btn-primary mr-1">Edit</Link>
                                <button onClick={() => deleteCar(car.id)} className="btn btn-sm btn-danger btn-delete-car" disabled={car.isDeleting}>
                                    {car.isDeleting 
                                        ? <span className="spinner-border spinner-border-sm"></span>
                                        : <span>Delete</span>
                                    }
                                </button>
                            </td>
                        </tr>
                    )}
                    {!cars &&
                        <tr>
                            <td colSpan="4" className="text-center">
                                <div className="spinner-border spinner-border-lg align-center"></div>
                            </td>
                        </tr>
                    }
                    {cars && !cars.length &&
                        <tr>
                            <td colSpan="4" className="text-center">
                                <div className="p-2">No Cars To Display</div>
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>
    );
}
