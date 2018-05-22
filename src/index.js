`use strict`

import 'babel-polyfill'
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import './controllers/Telegram'

// --- Routers ---
import assistantRouter from './routers/assistant.router'
// ---------------

var app = express()

app.set('PORT', process.env.PORT || 8000)
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// // --- Routes ---
// // --------------

app.listen(app.get('PORT'), ()=>{
    console.log(`Express server listening on port ${app.get('PORT')}`)
})
