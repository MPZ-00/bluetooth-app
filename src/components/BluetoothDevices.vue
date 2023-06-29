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
    },
}
</script>