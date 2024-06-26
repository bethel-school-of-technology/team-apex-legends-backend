import { Router } from 'express';
import { createCar, deleteCar, getAllCars, getCar, getCarByMake, getCarByUserId, updateCar } from '../controllers/carController';


const router = Router();

router.get('/make/:make', getCarByMake);
router.get('/byUserId/:userId', getCarByUserId);

router.get('/:id', getCar);
router.put('/:id', updateCar);
router.delete('/:id', deleteCar);

router.get('/', getAllCars);
router.post('/', createCar);


export default router;