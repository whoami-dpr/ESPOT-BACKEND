import express from 'express'
import { createAuthRouter } from './routes/auth.route.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(createAuthRouter())

app.listen(3000, () => {
  console.log('el servidor esta escuchando en http://localhost:3000')
})
