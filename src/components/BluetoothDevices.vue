<template>
    <div>
        <h2>Bluetooth Devices</h2>
        <button @click="connect" class="warning">Connect to any Device</button>
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
import { fetchDevices, saveDevice, connectToBluetoothDevice } from '../utils/bluetoothUtils.js'
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
        fetchDevices()
    },
    methods: {
        async connectToDevice(device) {
            try {
                if (device.connected) {
                    return
                }
                await connectToBluetoothDevice(device.service)
                device.connected = true
            } catch (error) {
                console.error('Error connecting to device:', error)
            }
        },
        async connect() {
            try {
                const connectedDevice = await connectToBluetoothDevice()
                await saveDevice(connectedDevice)
            } catch (error) {
                console.error('Error connecting to device:', error)
            }
        },
        async disconnectFromDevice(device) {
            device.gatt.disconnect()
        },
        async deleteDevice(device) {
            const token = await this.authenticate()  // Implementiere diese Methode, um einen Authentifizierungstoken vom Server zu erhalten
            try {
                console.info('Deleting device:', device)
                await axios.delete(`http://localhost:${PORT}/devices/${device._id}`, {
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
                    code: '345tg$%__1miep'
                })
                return response.data.tempToken
            } catch (error) {
                console.error('Error authenticating:', error)
            }
        }
    },
}
</script>