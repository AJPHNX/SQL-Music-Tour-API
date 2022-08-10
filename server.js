// DEPENDENCIES
const express = require('express')
const app = express()
const { Sequelize } = require('sequelize')
const db = require('./models')
const bands = require('./controllers/bands_controller')
// const squelize = new Sequelize(process.env.PG_URI)



// CONFIGURATION / MIDDLEWARE
require('dotenv').config()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const { sequelize } = require('./models/index.js')

// ROOT
app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Welcome to the Tour API'
    })
})

// CONTROLLERS 
const bandsController = require('./controllers/bands_controller')
app.use('/bands', bandsController)

const eventsController = require('./controllers/events_controller')
app.use('/events', eventsController)

const stageController = require('./controllers/stage_controller')

app.use('/stages', stageController)

// LISTEN
db.sequelize.sync({force:true}).then(() =>{
    app.listen(process.env.PORT, () => {
        console.log(`🎸 Rockin' on port: ${process.env.PORT}`)
    })
})