import express from 'express'
import apiRouter from './api.mjs'
const app = express()
const port = 3000

app.use('/api', apiRouter);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})