import { Router } from 'express';
import { body } from 'express-validator';
import { register, login, getProfile } from '../controllers/auth.controller.js';
import { auth } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';

export function setupAuthRoutes(router) {
  const authRouter = Router();

  authRouter.post('/register',
    [
      body('email').isEmail().normalizeEmail(),
      body('password').isLength({ min: 8 }),
      body('name').trim().notEmpty(),
      validate
    ],
    register
  );

  authRouter.post('/login',
    [
      body('email').isEmail().normalizeEmail(),
      body('password').notEmpty(),
      validate
    ],
    login
  );

  authRouter.get('/profile', auth, getProfile);

  router.use('/auth', authRouter);
}