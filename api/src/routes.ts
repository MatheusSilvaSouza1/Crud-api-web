import { Router } from 'express'

const Routes = Router()

Routes.get('/', (req, res) => {
    return res.send('hello')
})

export default Routes