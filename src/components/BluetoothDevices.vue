<template>
    <div>
        <h2>Bluetooth Devices</h2>
        <button @click="connect">Connect to Device</button>
        <ul>
            <li v-for="device in devices" :key="device.id">
                {{ getDeviceName(device) }}
                <button v-if="!deviceNames[device.id]" @click="setDeviceName(device)">Set Name</button>
                <button @click="connectToDevice(device)">Connect</button>
            </li>
        </ul>
    </div>
</template>
  
<script>
import axios from 'axios'
const PORT = process.env.PORT || 3000

export default {
    data() {
        return {
            devices: [],
            deviceNames: {},
        }
    },
    mounted() {
        this.fetchDevices()
    },
    methods: {
        async fetchDevices() {
            try {
                const isDocker = process.env.VUE_APP_IS_DOCKER === 'true';
                const hostname = isDocker ? 'server-container' : 'localhost';

                const response = await axios.get(`http://${hostname}:${PORT}/devices`)
                this.devices = response.data || []
                console.log('Fetch completed')
            } catch (error) {
                console.error('Error fetching devices:', error)
            }
        },
        async saveDevice(device) {
            console.log('connectToDevice', device)
            const connectedDevice = {
                name: this.getDeviceName(device),
                id: device.id,
                connected: true
            }

            try {
                const response = await axios.post('/devices', connectedDevice)
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
            return this.deviceNames[device.id] || 'No Name'
        },
    },
}
</script>