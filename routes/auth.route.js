import { Router } from 'express'
import AuthController from '../controllers/auth.controller.js'

export const createAuthRouter = () => {
  const authRouter = Router()
  const authController = new AuthController()

  authRouter.get('/api/auth', (req, res) => {
    res.send('Hola mundo')
  })

  authRouter.post('/api/auth/register', authController.register)

  return authRouter
}
