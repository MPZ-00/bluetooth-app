<template>
    <div>
        <input type="text" v-model="inputText" placeholder="Enter text to send...">
        <button v-if="isConnected" @click="sendData">Send Data</button>
        <button v-else disabled class="danger">Send Data</button>

        <button v-if="isConnected" @click="receiveData">Receive Data</button>
        <p v-if="isConnected">Connected to {{ characteristic.uuid }}</p>
        <p>Received Data: {{ receivedText }}</p>
    </div>
</template>
  
<script>
import { sendDataToBluetoothDevice, receiveDataFromBluetoothDevice } from '../utils/bluetoothUtils'

export default {
    data() {
        return {
            inputText: '',
            receivedText: '',
        }
    },
    methods: {
        async sendData() {
            try {
                await sendDataToBluetoothDevice(this.inputText)
            } catch (error) {
                console.error('Error sending data:', error)
            }
        },
        async receiveData() {
            try {
                this.receivedText = await receiveDataFromBluetoothDevice()
            } catch (error) {
                console.error('Error receiving data:', error)
            }
        },
    },
    props: {
        characteristic: {
            type: Object,
            required: false,
        },
        isConnected: {
            type: Boolean,
            required: false,
        },
    },
    watch: {
        isConnected() {
            this.receivedText = ''
        },
    },
}
</script>
  