import { Router } from 'express';
import userCtrl from '../controllers/user.controllers';
import { ErrorRouter } from '../errors/ErrorRouter';

const router = new ErrorRouter();

router.get('/all', userCtrl.getUsers);
router
  .route('/:userId')
  .get(userCtrl.getUser)
  .put(userCtrl.updateUser)
  .delete(userCtrl.deleteUser);

router.post('/create', userCtrl.createUser);
router.post('/login', userCtrl.logIn);

export default router.router;
