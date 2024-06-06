import { Router } from 'express';
import { createCar, deleteCar, getAllCars, getCar, getCarByMake, updateCar } from '../controllers/carController';


const router = Router();

router.get('/', getAllCars);

router.post('/', createCar);

router.get('/:id', getCar);

router.get('/make/:make', getCarByMake);

router.put('/:id', updateCar);

router.delete('/:id', deleteCar);

export default router;