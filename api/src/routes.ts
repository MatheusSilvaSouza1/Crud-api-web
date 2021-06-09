import { Router } from 'express'
import AuthenticationController from './controllers/AuthenticationController'
import ReportController from './controllers/ReportController'
import UserController from './controllers/UserController'
import { auth } from './middlewares/auth'

const Routes = Router()

Routes.post('/login', AuthenticationController.login)
Routes.post('/recover-password', AuthenticationController.recoverPassword)

Routes.use(auth)

Routes.get('/user', UserController.findAll)
Routes.post('/user', UserController.insert)
Routes.get('/user/:id', UserController.findOne)
Routes.put('/user/:id', UserController.update)
Routes.delete('/user', UserController.delete)

Routes.get('/report', ReportController.report)

export default Routes