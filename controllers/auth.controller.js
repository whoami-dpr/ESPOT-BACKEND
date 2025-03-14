import { validateLogin } from '../schemas/auth.schema.js'
import { validateUser } from '../schemas/user.schema.js'

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
    const user = req.body
    const result = validateLogin(user)

    console.log(result)
    if (result.success === false) {
      const field = result.error.issues[0].path[0]
      const error = result.error.issues[0].message
      return res.status(422).json({ field, error })
    }
    return res.status(200).send('Estas logeado')
  }
}

export default AuthController
