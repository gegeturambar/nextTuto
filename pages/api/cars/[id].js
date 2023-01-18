import { carsRepo } from 'helpers';

export default handler;

function handler(req, res) {
    switch (req.method) {
        case 'GET':
            return getCarById();
        case 'PUT':
            return updateCar();
        case 'DELETE':
            return deleteCar();
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`)
    }

    function getCarById() {
        const car = carsRepo.getById(req.query.id);
        return res.status(200).json(car);
    }

    function updateCar() {
        try {
            carsRepo.update(req.query.id, req.body);
            return res.status(200).json({});
        } catch (error) {
            return res.status(400).json({ message: error });
        }
    }

    function deleteCar() {
        carsRepo.delete(req.query.id);
        return res.status(200).json({});
    }
}
