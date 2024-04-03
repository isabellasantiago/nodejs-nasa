import express from 'express'
import setupMiddleware from './middleware'
import setupRoutest from './routes'

const app = express()
app.use(express.static('public'))

setupMiddleware(app)
setupRoutest(app)

export default app