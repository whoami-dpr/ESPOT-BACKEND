import { Router } from 'express'

export const createAuthRouter = () => {
  const authRouter = Router()

  authRouter.get('/api/auth', (req, res) => {
    res.send('Hola mundo')
  })

  return authRouter
}
