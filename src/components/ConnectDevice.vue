<template>
    <div>
        <button @click="searchDevices">Search Devices</button>
        <ul>
            <li v-for="device in savedDevices" :key="device.id">
                {{ device.name }}
                <button @click="connectToDevice(device)">Reconnect</button>
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
            savedDevices: [],
        }
    },
    methods: {
        async searchDevices() {
            try {
                const response = await axios.get(`http://localhost:${PORT}/devices`)
                this.savedDevices = response.data || []
            } catch (error) {
                console.error('Fehler beim Abrufen der Geräte:', error)
            }
        },
        connectToDevice(device) {
            console.log('connectToDevice', device)
            // TODO: Connect to device
        },
    },
}
</script>