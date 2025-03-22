import express from 'express'
import { createAuthRouter } from './routes/auth.route.js'
import AuthModel from './models/auth.model.js'
import config from './config.js'

const { PORT } = config
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(createAuthRouter({ authModel: AuthModel }))

app.listen(PORT, () => {
  console.log('el servidor esta escuchando en http://localhost:' + PORT)
})
