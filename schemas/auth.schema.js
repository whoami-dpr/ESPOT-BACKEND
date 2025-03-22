import { z } from 'zod'

const authSchema = z.object({
  password: z.string().min(8).max(30),
  identifier: z.union([
    z.string().email().transform(() => ({ type: 'email' })),
    z.string().min(7).max(30).transform(() => ({ type: 'username' }))
  ])
})

export const validateLogin = (input) => authSchema.safeParse(input)
