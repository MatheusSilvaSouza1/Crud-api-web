import { Router } from 'express'
import UserController from './controllers/UserController'
import { auth } from './middlewares/auth'

const Routes = Router()

Routes.post('/login', UserController.login)

Routes.use(auth)

Routes.get('/user', UserController.findAll)
Routes.post('/user', UserController.insert)
Routes.put('/user/:id', UserController.update)
Routes.delete('/user/:id', UserController.delete)

export default Routes