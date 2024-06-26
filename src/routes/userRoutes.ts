import { Router } from 'express';
import { createUser, loginUser, getAllUsers, getUser, getUserByUsername,  } from '../controllers/userController';
import { getCarByUserId } from '../controllers/carController';


const router = Router();



router.post('/', createUser);

router.post('/login', loginUser);

router.get('/id/:id', getUser);

router.get('/', getAllUsers);

router.get('/username/:username', getUserByUsername);




export default router;