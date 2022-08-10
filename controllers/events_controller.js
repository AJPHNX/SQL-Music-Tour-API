// DEPENDENCIES
const events = require('express').Router()
const { Event, Stage, Meet_Greet, Set_Time } = db

const {Op} = require('sequelize')


//INDEX-FIND ALL events
events.get('/', async (req, res) => {
    console.log('WE HIT THE EVENT FIND ALL ROUTE!!')
    try {
        const foundEvents = await Event.findAll({
        // console.log('found events!!!', foundEvents)
        order: [ [ 'date', 'ASC' ] ],
            where: {
                name: { [Op.like]: `%${req.query.name ? req.query.name : ''}%` }
            }
        })
        res.status(200).json(foundEvents)
        } catch (error) {
        console.log('errrrr', error)
        res.status(500).json(error)
    }
})

// SHOW-FIND A SPECIFIC Event
events.get('/:name', async (req, res) => {
    try {
        const foundEvent = await Event.findOne({
            where: { name: req.params.name },
            include: [
				{
					model: Stage,
					as: "stages",
					include: {
						model: Set_Time,
						as: "set_times"
					}
				},
				{
					model: Meet_Greet,
					as: "meet_greets"
				}
			]

        })
        res.status(200).json(foundEvent)
    } catch (error) {
        res.status(500).json(error)
    }
})

// CREATE A Event
events.post('/', async (req, res) => {
    try {
        console.log('about to save this thing', req.body)
        const newEvent = await Event.create(req.body)
        res.status(200).json({
            message: 'Successfully inserted a new event',
            data: newEvent
        })
    } catch(err) {
        console.log('errrrr in create', err)
        res.status(500).json(err)
    }
})

// UPDATE A Event
events.put('/:id', async (req, res) => {
    try {
        const updatedEvents = await Event.update(req.body, {
            where: {
                event_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully updated ${updatedEvents} event(s)`
        })
    } catch(err) {
        res.status(500).json(err)
    }
})

// DELETE A Event
events.delete('/:id', async (req, res) => {
    try {
        const deletedEvents = await Event.destroy({
            where: {
                event_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully deleted ${deletedEvents} event(s)`
        })
    } catch(err) {
        res.status(500).json(err)
    }
})




// EXPORT
module.exports = events



