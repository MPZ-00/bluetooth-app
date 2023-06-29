const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const crypto = require('crypto')

const AUTH_CODE = process.env.AUTH_CODE || `345tg$%__1miep`
const TOKEN_TTL = 60 * 60 * 1000 * 5 // 1 hour
const tokens = {} // Stores the temporary tokens

const BEARER_TOKEN = process.env.BEARER_TOKEN || `sEcUrE-ToKeN123`

const deviceSchema = new mongoose.Schema({
    name: String,
    id: String,
    connected: Boolean
})

const Device = mongoose.model('Device', deviceSchema)

const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization
    if (authHeader) {
        const token = authHeader.split(' ')[1]
        if (tokens[token] && Date.now() - tokens[token] <= TOKEN_TTL || token === BEARER_TOKEN) {
            next()
            return
        }
    }
    res.status(401).send('Authentication failed')
}

router.get('/devices', async (req, res) => {
    try {
        const devices = await Device.find()
        res.send(devices)
    } catch (err) {
        console.error(err)
        res.status(500).send(err)
    }
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
    try {
        const device = await Device.findByIdAndUpdate({
            id: req.params.id
        }, {
            name: req.body.name,
            id: req.body.id,
            connected: req.body.connected
        }, {
            new: true
        })

        if (!device) {
            return res.status(404).send('The device with the given ID was not found.')
        }
        console.log(device)
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

router.post('/auth', async (req, res) => {
    const authHeader = req.headers.authorization
    if (authHeader && authHeader.split(' ')[1] === BEARER_TOKEN || req.body.code === AUTH_CODE) {
        const tempToken = crypto.randomBytes(16).toString('hex')
        tokens[tempToken] = Date.now()
        return res.json({tempToken: tempToken})
    }

    res.status(401).send('Authentication failed')
})

setInterval(() => {
    // Clean up expired tokens every 5 minutes
    for (const token in tokens) {
        if (Date.now() - tokens[token] > TOKEN_TTL) {
            delete tokens[token]
        }
    }
}, 5 * 60 * 1000) // 5 minutes

module.exports = router