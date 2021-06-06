import { Router } from 'express'
import UserController from './controllers/UserController'
import { auth } from './middlewares/auth'

const Routes = Router()

Routes.post('/login', UserController.login)
Routes.post('/recover-password', UserController.recoverPassword)

Routes.use(auth)

Routes.get('/user', UserController.findAll)
Routes.post('/user', UserController.insert)
Routes.get('/user/:id', UserController.findOne)
Routes.put('/user/:id', UserController.update)
Routes.delete('/user', UserController.delete)

export default Routes