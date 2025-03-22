import { Router } from 'express'
import AuthController from '../controllers/auth.controller.js'

export const createAuthRouter = ({ authModel }) => {
  const authRouter = Router()
  const authController = new AuthController({ authModel })

  authRouter.get('/api/auth', (req, res) => {
    res.send('Hola mundo')
  })

  authRouter.post('/api/auth/register', authController.register)

  authRouter.post('/api/auth/login', authController.login)

  authRouter.get('/api/auth/protected', authController.verifyToken, (req, res) => {
    res.status(200).json({ message: 'user is authenticated' })
  })

  return authRouter
}
