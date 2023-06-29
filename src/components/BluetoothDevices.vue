<template>
    <div>
        <h2>Bluetooth Devices</h2>
        <button @click="connect" class="warning">Connect to a Device</button>
        <ul>
            <li v-for="device in devices" :key="device.id">
                <BluetoothDevice 
                    :device="device"
                    @set-name="setDeviceName"
                    @connect="connectToDevice"
                    @disconnect="disconnectFromDevice"
                />
            </li>
        </ul>
    </div>
</template>
  
<script>
import axios from 'axios'
import BluetoothDevice from './BluetoothDevice.vue'
const PORT = process.env.VUE_APP_PORT || 3000

export default {
    components: {
        BluetoothDevice,
    },
    data() {
        return {
            devices: [],
        }
    },
    mounted() {
        this.fetchDevices()
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
        async connectToDevice(device) {
            navigator.bluetooth.requestDevice({
                acceptAllDevices: true,
                optionalServices: [device.service]
            })
            .then(device => {
                console.log(device)
                return device.gatt.connect()
            })
            .then(() => {
                this.saveDevice(device)
            })
            .catch(error => {
                console.error('Error connecting to device:', error)
            })
        },
        async disconnectFromDevice(device) {
            device.gatt.disconnect()
        },
        async setDeviceName(device, newName) {
            try {
                const response = await axios.put(`http://localhost:${PORT}/devices/${device.id}`, {
                    name: newName
                })
                const updatedDevice = response.data

                const index = this.devices.findIndex(d => d.id === updatedDevice.id)
                this.devices.splice(index, 1, updatedDevice)
            } catch (error) {
                console.error('Error updating device:', error)
            }
        },
    },
}
</script>