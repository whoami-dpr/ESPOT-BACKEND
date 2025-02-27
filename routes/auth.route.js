import { Router } from 'express'

export const createAuthRouter = () => {
  const authRouter = Router()

  authRouter.get('/api/auth', (req, res) => {
    res.send('Hola mundo')
  })

  authRouter.post('/api/auth/register', (req, res) => {
    const user = req.body
    res.send('Bienvenido a registrarse estos son sus datos')
  })

  return authRouter
}
