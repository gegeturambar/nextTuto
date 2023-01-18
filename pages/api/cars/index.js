import { carsRepo } from 'helpers';

export default handler;

function handler(req, res) {
    switch (req.method) {
        case 'GET':
            return getCars();
        case 'POST':
            return createCar();
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`)
    }

    function getCars() {
        const cars = carsRepo.getAll();
        return res.status(200).json(cars);
    }
    
    function createCar() {
        try {
            carsRepo.create(req.body);
            return res.status(200).json({});
        } catch (error) {
            return res.status(400).json({ message: error });
        }
    }
}
