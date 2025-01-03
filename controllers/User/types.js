const { describe } = require('pm2')
const { z, object } = require('zod')



const setUserInput = z.object({
    name: z.string(),
    surname: z.string(),
    email: z.string(),
    role: z.string(),
    password: z.string(),
})

const LoginInput = z.object({
    email: z.string().email(),
    password: z.string().min(4).max(30),
})

const getUsersInput = z.object({
    userId: z.string().optional(),
})

const deleteUsersInput = z.object({
    userId: z.string(),
})

const updateUsersInput = z.object({
    userId: z.string(),
    name: z.string().optional(),
    surname: z.string().optional(),
    email: z.string().optional(),
    role: z.string().optional()
})

const changePasswordInput = z.object({
    email: z.string().email().optional(), 
  });

const setNewPasswordInput = z.object({
    email: z.string().optional(),
    newPassword: z.string(),
})


module.exports = {
  deleteUsersInput,
  changePasswordInput,
  updateUsersInput,
  getUsersInput,
  setUserInput,
  LoginInput,
  setNewPasswordInput,
}
