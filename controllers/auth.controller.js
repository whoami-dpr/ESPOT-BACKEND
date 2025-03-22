import { validateLogin } from '../schemas/auth.schema.js'
import { validateUser } from '../schemas/user.schema.js'
import config from '../config.js'
import jwt from 'jsonwebtoken'

const { SECRET_KEY } = config

class AuthController {
  constructor ({ authModel }) {
    this.authModel = authModel
  }

  register = (req, res) => {
    const user = req.body
    const result = validateUser(user)

    if (result.success === false) {
      const field = result.error.issues[0].path[0]
      const error = result.error.issues[0].message
      return res.status(422).json({ field, error })
    }

    const response = this.authModel.userRegister({ user })

    if (response.success === false) {
      return res.status(422).json({ error: response.message })
    }

    res.send(response)
  }

  login = (req, res) => {
    const { username, password } = req.body

    console.log(username, password)

    if (!username || !password) {
      return res.status(400).json({ message: 'username or password are required' })
    }

    const result = validateLogin({
      identifier: username,
      password
    })

    if (result.success === false) {
      const field = result.error.issues[0].path[0]
      const error = result.error.issues[0].message
      return res.status(422).json({ field, error })
    }

    if (username === 'johnnie' && password === 'password123') {
      const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' })
      return res.status(200).json({ token })
    } else {
      return res.status(401).json({ message: 'Authentication failed' })
    }
  }

  verifyToken = (req, res, next) => {
    const header = req.header('Authorization')
    const token = header.split(' ')[1]
    if (!token) {
      return res.status(401).json({ message: 'Token not provied' })
    }
    try {
      const payload = jwt.verify(token, SECRET_KEY)
      req.username = payload.username
      next()
    } catch (error) {
      return res.status(403).json({ message: 'Token not valid' })
    }
  }
}

export default AuthController
