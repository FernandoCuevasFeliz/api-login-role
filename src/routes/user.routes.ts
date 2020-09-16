import { Router } from 'express';
import userCtrl from '../controllers/user.controllers';
import { ErrorRouter } from '../errors/ErrorRouter';

const router = new ErrorRouter();

router.get('/all', userCtrl.getUsers);
router.get('/:userId', userCtrl.getUser);
router.post('/create', userCtrl.createUser);

export default router.router;
