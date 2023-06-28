const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const {
    Buffer
} = require('buffer')

const ObjectId = mongoose.Types.ObjectId

const deviceSchema = new mongoose.Schema({
    name: String,
    deviceId: String,
    connected: Boolean
})

const Device = mongoose.model('Device', deviceSchema)

const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization
    if (!authHeader && authHeader !== `Bearer ${process.env.VUE_APP_AUTH_HEADER}`) {
        res.status(401).send('Authentication failed')
        return
    }
    next()
}

router.get('/devices', async (req, res) => {
    const devices = await Device.find()
    res.send(devices)
})

router.post('/devices', async (req, res) => {
    const device = new Device({
        name: req.body.name,
        deviceId: req.body.deviceId,
        connected: req.body.connected
    })
    const result = await device.save()
    res.send(result)
})

router.put('/devices/:id', async (req, res) => {
    try {
        const deviceId = req.params.id
        if (!ObjectId.isValid(deviceId)) {
            return res.status(404).send('Invalid ID')
        }

        const device = await Device.findByIdAndUpdate(
            deviceId, {
                name: req.body.name,
                deviceId: req.body.deviceId,
                connected: req.body.connected
            }, {
                new: true
            })

        if (!device) {
            return res.status(404).send('The device with the given ID was not found.')
        }

        res.send(device)
    } catch (err) {
        console.error(err)
        res.status(500).send(err)
    }
})

router.delete('/devices/:id', authenticate, async (req, res) => {
    const device = await Device.findByIdAndRemove(req.params.id)

    if (!device) {
        return res.status(404).send('The device with the given ID was not found.')
    }

    res.send(device)
})

module.exports = router