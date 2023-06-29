<template>
    <div>
        <h2>Bluetooth Devices</h2>
        <button @click="connect" class="warning">Connect to a Device</button>
        <ul>
            <li v-for="device in devices" :key="device.id">
                <BluetoothDevice :device="device" @set-name="setDeviceName" @connect="connectToDevice"
                    @disconnect="disconnectFromDevice" @delete="deleteDevice" />
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
            const connectedDevice = {
                name: this.getDeviceName(device),
                id: device.id,
                connected: false
            }

            // Check if the device is already in the list
            const existingDevice = this.devices.find(d => d.id === connectedDevice.id)

            if (existingDevice) {
                // If the device already exists, update it
                try {
                    const response = await axios.put(`http://localhost:${PORT}/devices/${connectedDevice.id}`, connectedDevice)
                    const updatedDevice = response.data

                    const index = this.devices.findIndex(d => d.id === updatedDevice.id)
                    this.devices.splice(index, 1, updatedDevice)
                } catch (error) {
                    console.error('Error updating device:', error)
                }
            } else {
                // If the device does not exist yet, add it
                try {
                    const response = await axios.post(`http://localhost:${PORT}/devices`, connectedDevice)
                    const newDevice = response.data

                    this.devices.push(newDevice)
                } catch (error) {
                    console.error('Error adding device:', error)
                }
            }
        },
        async connectToBluetoothDevice(service) {
            const device = await navigator.bluetooth.requestDevice({
                acceptAllDevices: true,
                optionalServices: [service || '0000ffe0-0000-1000-8000-00805f9b34fb']
            })

            console.log(device);
            return device.gatt.connect();
        },
        async connectToDevice(device) {
            try {
                if (device.connected) {
                    return
                }
                await this.connectToBluetoothDevice(device.service)
                device.connected = true
            } catch (error) {
                console.error('Error connecting to device:', error)
            }
        },
        async connect() {
            try {
                const connectedDevice = await this.connectToBluetoothDevice()
                await this.saveDevice(connectedDevice)
            } catch (error) {
                console.error('Error connecting to device:', error)
            }
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
        getDeviceName(device) {
            return device.name || 'No Name'
        },
        async deleteDevice(device) {
            const token = await this.authenticate()  // Implementiere diese Methode, um einen Authentifizierungstoken vom Server zu erhalten
            try {
                await axios.delete(`http://localhost:${PORT}/devices/${device.id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`  // Sendet den Authentifizierungstoken in den Headers der Anfrage
                    }
                })
                const index = this.devices.findIndex(d => d.id === device.id)
                this.devices.splice(index, 1)
            } catch (error) {
                console.error('Error deleting device:', error)
            }
        },
        async authenticate() {
            try {
                const response = await axios.post(`http://localhost:${PORT}/auth`, {
                    username: 'admin',
                    password: 'admin'
                })
                const token = response.data.token
                return token
            } catch (error) {
                console.error('Error authenticating:', error)
            }
        }
    },
}
</script>