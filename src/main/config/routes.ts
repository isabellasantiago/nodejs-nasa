import { Express, Router } from 'express'
import { readdirSync } from 'fs'

export default (app: Express): void => {
    const router = Router()
    app.use('/auth', router)
    readdirSync(`${__dirname}/../routes`).map(async file => {
        if (!file.includes('.spec.')) {
            (await import(`../routes/${file}`)).default(router)
        }
    })
}