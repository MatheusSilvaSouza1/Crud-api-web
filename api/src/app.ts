import 'reflect-metadata'
import './database/connection'
import cors from 'cors'
import express from 'express'
import Routes from './routes'

const app = express()

app.use(express.json())
app.use(cors({ exposedHeaders: 'X-Total-Count' }))
app.use(Routes)

export default app