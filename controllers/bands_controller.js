// DEPENDENCIES
const bands = require('express').Router()
const db = require('../models')
const { Band, MeetGreet, Event, SetTime } = db 
const {Op} = require('sequelize')


//INDEX-FIND ALL BANDS
bands.get('/', async (req, res) => {
    console.log('WE HIT THE BAND FIND ALL ROUTE!!')
    try {
        
        const foundBands = await band.findAll({
        // console.log('found bands!!!', foundBands)
        order: [ [ 'available_start_time', 'ASC' ] ],
            where: {
                name: { [Op.like]: `%${req.query.name ? req.query.name : ''}%` }
            }
        })
        res.status(200).json(foundBands)
        } catch (error) {
        console.log('errrrr', error)
        res.status(500).json(error)
    }
})

// SHOW-FIND A SPECIFIC BAND
bands.get('/:name', async (req, res) => {
    try {
        const foundBand = await Band.findOne({
            where: { name: req.params.name  },
            include: [ 
                { 
                    model: MeetGreet, 
                    as: "meet_greets",
                    include: { 
                        model: Event, 
                        as: "event" ,
                        where: { 
                            name: { 
                                [Op.like]: `%${req.query.event ? req.query.event : ''}%` 
                            } 
                        }} 
                },
                { 
                    model: SetTime,
                    as: "set_times",
                    include: { 
                        model: Event, 
                        as: "event", 
                        where: {name: {[Op.like]: `%${req.query.event ? req.query.event : ''}%` } } 
                    }
                }
            ] 
        })
        res.status(200).json(foundBand)
    } catch (error) {
        res.status(500).json(error)
    }
})


// CREATE A BAND
bands.post('/', async (req, res) => {
    try {
        console.log('about to sabe this thing', req.body)
        const newBand = await band.create(req.body)
        res.status(200).json({
            message: 'Successfully inserted a new band',
            data: newBand
        })
    } catch(err) {
        console.log('errrrr in create', err)
        res.status(500).json(err)
    }
})

// UPDATE A BAND
bands.put('/:id', async (req, res) => {
    try {
        const updatedBands = await band.update(req.body, {
            where: {
                band_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully updated ${updatedBands} band(s)`
        })
    } catch(err) {
        res.status(500).json(err)
    }
})

// DELETE A BAND
bands.delete('/:id', async (req, res) => {
    try {
        const deletedBands = await band.destroy({
            where: {
                band_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully deleted ${deletedBands} band(s)`
        })
    } catch(err) {
        res.status(500).json(err)
    }
})




// EXPORT
module.exports = bands


