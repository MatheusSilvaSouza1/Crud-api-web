import { Router } from 'express'
import UserController from './controllers/UserController'

const Routes = Router()

Routes.get('/user', UserController.findAll)
Routes.post('/user', UserController.insert)
Routes.put('/user/:id', UserController.update)
Routes.delete('/user/:id', UserController.delete)

export default Routes