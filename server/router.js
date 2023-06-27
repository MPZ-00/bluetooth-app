const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const deviceSchema = new mongoose.Schema({
    name: String,
    id: String,
    connected: Boolean
})

const Device = mongoose.model('Device', deviceSchema)

router.get('/devices', async (req, res) => {
    const devices = await Device.find()
    res.send(devices)
})

router.post('/devices', async (req, res) => {
    const device = new Device({
        name: req.body.name,
        id: req.body.id,
        connected: req.body.connected
    })
    const result = await device.save()
    res.send(result)
})

router.put('/devices/:id', async (req, res) => {
    const device = await Device.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        id: req.body.id,
        connected: req.body.connected
    }, {
        new: true
    })

    if (!device) {
        return res.status(404).send('The device with the given ID was not found.')
    }

    res.send(device)
})

router.delete('/devices/:id', async (req, res) => {
    const device = await Device.findByIdAndRemove(req.params.id)

    if (!device) {
        return res.status(404).send('The device with the given ID was not found.')
    }

    res.send(device)
})

module.exports = router