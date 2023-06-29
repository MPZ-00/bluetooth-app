<template>
    <div>
        <h2>Bluetooth Devices</h2>
        <button @click="connect" class="warning">Connect to a Device</button>
        <ul>
            <li v-for="device in devices" :key="device.id">
                {{ getDeviceName(device) }}
                <button v-if="!device.name" @click="setDeviceName(device)" class="info">Set
                    Name</button>
                <button v-if="!device.connected" @click="connectToDevice(device)" class="success">Connect</button>
                <button v-else @click="disconnectFromDevice(device)" class="danger">Disconnect</button>
            </li>
        </ul>
    </div>
</template>
  
<script>
import axios from 'axios'
const PORT = process.env.VUE_APP_PORT || 3000

export default {
    data() {
        return {
            devices: [],
            deviceNames: {},
        }
    },
    mounted() {
        this.fetchDevices()
        console.log('this.devices', this.devices)
    },
    methods: {
        async fetchDevices() {
            try {
                const response = await axios.get(`http://localhost:${PORT}/devices`)
                this.devices = response.data || []
            } catch (error) {
                console.error('Error fetching devices:', error)
            }
        },
        async saveDevice(device) {
            console.log('saveDevice', device)
            const connectedDevice = {
                name: this.getDeviceName(device),
                id: device.id,
                connected: false
            }

            try {
                const response = await axios.post(`http://localhost:${PORT}/devices`, connectedDevice)
                const newDevice = response.data

                this.devices.push(newDevice)
            } catch (error) {
                console.error('Error adding device:', error)
            }
        },
        async connect() {
            try {
                let requestedDevice = await navigator.bluetooth.requestDevice({
                    acceptAllDevices: true,
                    optionalServices: ['battery_service']
                })
                console.log('requestedDevice', requestedDevice)

                if (!this.devices.find(device => device.id === requestedDevice.id)) {
                    this.devices.push(requestedDevice)
                }
            } catch (error) {
                if (error instanceof DOMException && error === 20) {
                    console.log('User cancelled the requestDevice() chooser.')
                } else {
                    console.error('Error connecting to device:', error)
                }
            }
        },
        async setDeviceName(device) {
            let newName = prompt('Enter new device name')
            if (newName) {
                this.deviceNames[device.id] = newName
                await this.saveDevice(device)
            }
        },
        getDeviceName(device) {
            return device.name || this.deviceNames[device.id] || 'No Name'
        },
        disconnectFromDevice(device) {
            console.log('disconnectFromDevice', device)
            try {
                if (device.gatt.connected) {
                    device.gatt.disconnect()
                    device.connected = false
                }
            } catch (error) {
                console.error('Error disconnecting from device:', error)
            }
        },
        connectToDevice(device) {
            console.log('connectToDevice', device)
            try {
                device.gatt.connect()
                device.connected = true
            } catch (error) {
                console.error('Error connecting to device:', error)
            }
        },
    },
}
</script>