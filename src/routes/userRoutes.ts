import { Router } from 'express';
import { createUser, loginUser, getAllUsers, getUser,  } from '../controllers/userController';


const router = Router();



router.post('/', createUser);
router.post('/login', loginUser);
router.get('/:id', getUser);
router.get('/', getAllUsers);


export default router;