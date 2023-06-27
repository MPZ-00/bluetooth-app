<template>
    <div>
        <BluetoothScanner @deviceSelected="onDeviceSelected" />
        <ul>
            <li v-for="device in devices" :key="device.deviceId">
                {{ device.name }}
                <button @click="connectDevice(device.deviceId)">Connect</button>
            </li>
        </ul>
        <div v-if="connectedDevice">
            <h3>Connected Device: {{ connectedDevice.name }}</h3>
            <input v-model="message" type="text" placeholder="Enter message" />
            <button @click="sendMessage">Send Message</button>
        </div>
    </div>
</template>
  
<script>
import { ref } from 'vue'
import { useBluetooth } from '@vueuse/core'
import BluetoothScanner from './BluetoothScanner.vue'

export default {
    name: 'BluetoothDevices',
    components: {
        BluetoothScanner,
    },
    setup() {
        const { connect, send } = useBluetooth()
        const connectedDevice = ref(null)
        const message = ref('')
        const devices = ref([])

        const connectDevice = async (deviceId) => {
            // Connect to the selected device
            const device = await connect(deviceId)
            if (device) {
                connectedDevice.value = device
            }
        }

        const sendMessage = () => {
            // Send the message to the connected device
            send(connectedDevice.value.deviceId, message.value)
        }

        const onDeviceSelected = (device) => {
            devices.value.push(device)
        }

        return {
            devices,
            connectedDevice,
            message,
            connectDevice,
            sendMessage,
            onDeviceSelected,
        }
    },
}
</script> 